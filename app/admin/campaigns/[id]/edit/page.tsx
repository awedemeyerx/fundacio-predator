'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import CampaignForm from '@/components/admin/CampaignForm';

export default function EditCampaignPage({ params }: { params: { id: string } }) {
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/campaigns/${params.id}`)
      .then(r => r.json())
      .then(data => {
        setCampaign(data.campaign);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  return (
    <div className="flex min-h-screen bg-warm-sand">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Projekt bearbeiten" />
        <div className="p-8">
          {loading ? (
            <p className="text-charcoal-muted text-sm">Loading...</p>
          ) : campaign ? (
            <CampaignForm campaign={campaign} />
          ) : (
            <p className="text-red-500 text-sm">Campaign not found</p>
          )}
        </div>
      </div>
    </div>
  );
}
