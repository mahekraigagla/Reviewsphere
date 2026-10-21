import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { DataProvider } from './context/DataContext';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { DirectoryPage } from './pages/public/DirectoryPage';
import { PublicBusinessProfile } from './pages/public/PublicBusinessProfile';
import { PublicProductPage } from './pages/public/PublicProductPage';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { OnboardingPage } from './pages/auth/OnboardingPage';

// Dashboard Pages
import { OverviewPage } from './pages/dashboard/OverviewPage';
import { ReviewsPage } from './pages/dashboard/ReviewsPage';
import { CompanyReviewsPage } from './pages/dashboard/CompanyReviewsPage';
import { ProductReviewsPage } from './pages/dashboard/ProductReviewsPage';
import { CustomersPage } from './pages/dashboard/CustomersPage';
import { ProductsPage } from './pages/dashboard/ProductsPage';
import { OrdersPage } from './pages/dashboard/OrdersPage';
import { CampaignsPage } from './pages/dashboard/CampaignsPage';
import { RequestReviewPage } from './pages/dashboard/RequestReviewPage';
import { AnalyticsPage } from './pages/dashboard/AnalyticsPage';
import { AiInsightsPage } from './pages/dashboard/AiInsightsPage';
import { AiAssistantPage } from './pages/dashboard/AiAssistantPage';
import { WidgetsPage } from './pages/dashboard/WidgetsPage';
import { ImportPage } from './pages/dashboard/ImportPage';
import { SettingsPage } from './pages/dashboard/SettingsPage';

// Customer Submission Page
import { CustomerReviewForm } from './pages/customer/CustomerReviewForm';

export default function App() {
  return (
    <DataProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<HomePage />} />
        <Route path="/directory" element={<DirectoryPage />} />
        <Route path="/public/business/:id" element={<PublicBusinessProfile />} />
        <Route path="/public/product/:id" element={<PublicProductPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Customer Review Submission Form Links (Universal Global Routes) */}
        <Route path="/review/submit" element={<CustomerReviewForm />} />
        <Route path="/feedback" element={<CustomerReviewForm />} />
        <Route path="/review" element={<CustomerReviewForm />} />
        <Route path="/form" element={<CustomerReviewForm />} />
        <Route path="/r/:token" element={<CustomerReviewForm />} />
        <Route path="/form/:token" element={<CustomerReviewForm />} />
        <Route path="/public/review" element={<CustomerReviewForm />} />

        {/* Business Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="request-review" element={<RequestReviewPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="company-reviews" element={<CompanyReviewsPage />} />
          <Route path="product-reviews" element={<ProductReviewsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="campaigns" element={<CampaignsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="ai-insights" element={<AiInsightsPage />} />
          <Route path="ai-assistant" element={<AiAssistantPage />} />
          <Route path="widgets" element={<WidgetsPage />} />
          <Route path="import" element={<ImportPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </DataProvider>
  );
}

