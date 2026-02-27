'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import CampaignForm from '@/components/admin/CampaignForm';

export default function NewCampaignPage() {
  return (
    <div className="flex min-h-screen bg-warm-sand">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Neues Projekt" />
        <div className="p-8">
          <CampaignForm />
        </div>
      </div>
    </div>
  );
}
