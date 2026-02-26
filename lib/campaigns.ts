import { supabaseAdmin } from './supabase';
import { Lang } from './types';

export interface Campaign {
  id: number;
  slug: string;
  name_de: string;
  name_en: string;
  name_es: string;
  description_de: string | null;
  description_en: string | null;
  description_es: string | null;
  target_amount_cents: number;
  cover_image_url: string | null;
  active: boolean;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CampaignWithProgress extends Campaign {
  raised_cents: number;
  progress_percent: number;
}

export function getLocalizedCampaign(campaign: Campaign | CampaignWithProgress, lang: Lang) {
  return {
    ...campaign,
    name: campaign[`name_${lang}`] || campaign.name_de,
    description: campaign[`description_${lang}`] || campaign.description_de,
  };
}

export async function getActiveCampaigns(): Promise<CampaignWithProgress[]> {
  if (!supabaseAdmin) return [];

  const { data, error } = await supabaseAdmin
    .from('fundacio_campaign_progress')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch campaigns:', error);
    return [];
  }

  return data || [];
}

export async function getCampaignBySlug(slug: string): Promise<CampaignWithProgress | null> {
  if (!supabaseAdmin) return null;

  const { data, error } = await supabaseAdmin
    .from('fundacio_campaign_progress')
    .select('*')
    .eq('slug', slug)
    .eq('active', true)
    .single();

  if (error) return null;
  return data;
}

export async function getAllCampaigns(): Promise<Campaign[]> {
  if (!supabaseAdmin) return [];

  const { data, error } = await supabaseAdmin
    .from('fundacio_campaigns')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch campaigns:', error);
    return [];
  }

  return data || [];
}
