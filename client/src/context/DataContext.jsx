import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const API_BASE = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '';

const apiFetch = (url, options) => {
  const finalUrl = url.startsWith('http') ? url : `${API_BASE}${url}`;
  return fetch(finalUrl, options);
};

export const DataProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('reviewsphere_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [business, setBusiness] = useState(null);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [topics, setTopics] = useState([]);
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New 5-star verified review received for Boat Rockerz 550", time: "10 mins ago", read: false },
    { id: 2, text: "Diwali Customer Review Campaign milestone reached: 680 reviews", time: "1 hour ago", read: false },
    { id: 3, text: "AI Insights generated: Fast UPI checkout highlighted in 94% reviews", time: "3 hours ago", read: true }
  ]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resBiz, resProd, resCust, resOrd, resRev, resCamp, resIns, resWig, resInv] = await Promise.all([
        apiFetch('/api/business').then(r => r.json()),
        apiFetch('/api/products').then(r => r.json()),
        apiFetch('/api/customers').then(r => r.json()),
        apiFetch('/api/orders').then(r => r.json()),
        apiFetch('/api/reviews').then(r => r.json()),
        apiFetch('/api/campaigns').then(r => r.json()),
        apiFetch('/api/ai/insights').then(r => r.json()),
        apiFetch('/api/widgets').then(r => r.json()),
        apiFetch('/api/invitations').then(r => r.json())
      ]);

      if (resBiz.success) setBusiness(resBiz.business);
      if (resProd.success) setProducts(resProd.products);
      if (resCust.success) setCustomers(resCust.customers);
      if (resOrd.success) setOrders(resOrd.orders);
      if (resRev.success) setReviews(resRev.reviews);
      if (resCamp.success) setCampaigns(resCamp.campaigns);
      if (resIns.success) setAiInsights(resIns.insights || []);
      if (resWig.success) setWidgets(resWig.widgets);
      if (resInv && resInv.success) setInvitations(resInv.invitations || []);
    } catch (err) {
      console.error("Error fetching data from ReviewSphere API:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      }).then(r => r.json());

      if (res.success) {
        setCurrentUser(res.user);
        if (res.business) setBusiness(res.business);
        localStorage.setItem('reviewsphere_user', JSON.stringify(res.user));
        localStorage.setItem('reviewsphere_token', res.token);
        fetchData();
      }
      return res;
    } catch (err) {
      return { success: false, message: "Network connection error" };
    }
  };

  const registerUser = async (userData) => {
    try {
      const res = await apiFetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      }).then(r => r.json());

      if (res.success) {
        setCurrentUser(res.user);
        if (res.business) setBusiness(res.business);
        localStorage.setItem('reviewsphere_user', JSON.stringify(res.user));
        localStorage.setItem('reviewsphere_token', res.token);
        fetchData();
      }
      return res;
    } catch (err) {
      return { success: false, message: "Network connection error" };
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem('reviewsphere_user');
    localStorage.removeItem('reviewsphere_token');
  };

  const submitReview = async (reviewPayload) => {
    const payload = {
      businessId: business?.id,
      ...reviewPayload
    };
    const res = await apiFetch('/api/reviews/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(r => r.json());

    if (res.success) {
      fetchData();
    }
    return res;
  };

  const seedDemoData = async () => {
    try {
      const res = await apiFetch('/api/business/seed-demo-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }).then(r => r.json());
      if (res.success) {
        await fetchData();
      }
      return res;
    } catch (err) {
      return { success: false, message: "Network error loading demo data" };
    }
  };

  const replyToReview = async (reviewId, responseText) => {
    const res = await apiFetch(`/api/reviews/${reviewId}/reply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ responseText })
    }).then(r => r.json());

    if (res.success) fetchData();
    return res;
  };

  const addCustomer = async (custData) => {
    const res = await apiFetch('/api/customers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(custData)
    }).then(r => r.json());

    if (res.success) fetchData();
    return res;
  };

  const addProduct = async (prodData) => {
    const res = await apiFetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prodData)
    }).then(r => r.json());

    if (res.success) fetchData();
    return res;
  };

  const createOrder = async (ordData) => {
    const res = await apiFetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ordData)
    }).then(r => r.json());

    if (res.success) fetchData();
    return res;
  };

  const importCSV = async (type, rows) => {
    let endpoint = `/api/${type}/import`;
    const res = await apiFetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rows })
    }).then(r => r.json());

    if (res.success) fetchData();
    return res;
  };

  const requestReview = async (payload) => {
    try {
      const res = await apiFetch('/api/reviews/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(r => r.json());

      if (res.success) {
        fetchData();
      }
      return res;
    } catch (err) {
      return { success: false, message: "Network connection error" };
    }
  };

  const askAiAssistant = async (question) => {
    const res = await apiFetch('/api/ai/assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    }).then(r => r.json());
    return res;
  };

  return (
    <DataContext.Provider value={{
      currentUser,
      loginUser,
      registerUser,
      logoutUser,
      business,
      products,
      customers,
      orders,
      reviews,
      campaigns,
      invitations,
      aiInsights,
      topics,
      widgets,
      loading,
      notifications,
      refreshData: fetchData,
      requestReview,
      submitReview,
      replyToReview,
      addCustomer,
      addProduct,
      createOrder,
      importCSV,
      askAiAssistant,
      seedDemoData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
