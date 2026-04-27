import { createClient } from "@supabase/supabase-js";

// Supabase configuration - Replace with your own credentials from Supabase Dashboard
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://logqrqbcxfchgzbyxaem.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_j2F5AbV-jzMGP9HhwtPCTg_hoFr4a0T";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Site Config Functions
export async function getSiteConfig() {
  try {
    const { data, error } = await supabase
      .from("site_config")
      .select("*")
      .eq("id", "main")
      .single();
    
    if (error) {
      console.error("Supabase error getting site config:", error);
      throw error;
    }
    console.log("✅ Site config loaded:", data);
    return data;
  } catch (error) {
    console.error("Error getting site config:", error);
    return null;
  }
}

export async function updateSiteConfig(config: any) {
  try {
    console.log("📝 Saving to Supabase:", config);
    const { error } = await supabase
      .from("site_config")
      .upsert({ id: "main", ...config, updated_at: new Date().toISOString() });
    
    if (error) {
      console.error("❌ Supabase save error:", error);
      throw error;
    }
    console.log("✅ Site config saved successfully!");
    return true;
  } catch (error) {
    console.error("Error updating site config:", error);
    return false;
  }
}

// Teachers Functions
export async function getTeachers() {
  try {
    const { data, error } = await supabase
      .from("teachers")
      .select("*")
      .order("name");
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting teachers:", error);
    return [];
  }
}

export async function addTeacher(teacher: any) {
  try {
    const { data, error } = await supabase
      .from("teachers")
      .insert([{ ...teacher, created_at: new Date().toISOString() }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding teacher:", error);
    return null;
  }
}

export async function updateTeacher(id: string, data: any) {
  try {
    const { error } = await supabase
      .from("teachers")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating teacher:", error);
    return false;
  }
}

export async function deleteTeacher(id: string) {
  try {
    const { error } = await supabase
      .from("teachers")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return false;
  }
}

// Principal Functions
export async function getPrincipal() {
  try {
    const { data, error } = await supabase
      .from("principal")
      .select("*")
      .eq("id", "main")
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error getting principal:", error);
    return null;
  }
}

export async function updatePrincipal(data: any) {
  try {
    const { error } = await supabase
      .from("principal")
      .upsert({ id: "main", ...data, updated_at: new Date().toISOString() });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating principal:", error);
    return false;
  }
}

// Inquiries Functions
export async function getInquiries() {
  try {
    const { data, error } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting inquiries:", error);
    return [];
  }
}

export async function addInquiry(inquiry: any) {
  try {
    const { data, error } = await supabase
      .from("inquiries")
      .insert([{ ...inquiry, status: "new", created_at: new Date().toISOString() }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding inquiry:", error);
    return null;
  }
}

export async function updateInquiryStatus(id: string, status: string) {
  try {
    const { error } = await supabase
      .from("inquiries")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return false;
  }
}

export async function deleteInquiry(id: string) {
  try {
    const { error } = await supabase
      .from("inquiries")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return false;
  }
}

// Admission Inquiries Functions
export async function getAdmissionInquiries() {
  try {
    const { data, error } = await supabase
      .from("admission_inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting admission inquiries:", error);
    return [];
  }
}

export async function addAdmissionInquiry(inquiry: any) {
  try {
    const { data, error } = await supabase
      .from("admission_inquiries")
      .insert([{ ...inquiry, status: "new", created_at: new Date().toISOString() }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding admission inquiry:", error);
    return null;
  }
}

export async function updateAdmissionInquiryStatus(id: string, status: string) {
  try {
    const { error } = await supabase
      .from("admission_inquiries")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating admission inquiry:", error);
    return false;
  }
}

export async function deleteAdmissionInquiry(id: string) {
  try {
    const { error } = await supabase
      .from("admission_inquiries")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting admission inquiry:", error);
    return false;
  }
}

// News Functions
export async function getNews() {
  try {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("date", { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting news:", error);
    return [];
  }
}

export async function addNews(news: any) {
  try {
    const { data, error } = await supabase
      .from("news")
      .insert([{ ...news, created_at: new Date().toISOString() }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding news:", error);
    return null;
  }
}

export async function updateNews(id: string, data: any) {
  try {
    const { error } = await supabase
      .from("news")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating news:", error);
    return false;
  }
}

export async function deleteNews(id: string) {
  try {
    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting news:", error);
    return false;
  }
}

// Testimonials Functions
export async function getTestimonials() {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting testimonials:", error);
    return [];
  }
}

export async function addTestimonial(testimonial: any) {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .insert([{ ...testimonial, created_at: new Date().toISOString() }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding testimonial:", error);
    return null;
  }
}

export async function deleteTestimonial(id: string) {
  try {
    const { error } = await supabase
      .from("testimonials")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return false;
  }
}

// Photos/Gallery Functions
export async function getPhotos() {
  try {
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error getting photos:", error);
    return [];
  }
}

export async function addPhoto(photo: any) {
  try {
    const { data, error } = await supabase
      .from("photos")
      .insert([{ ...photo, created_at: new Date().toISOString() }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error adding photo:", error);
    return null;
  }
}

export async function deletePhoto(id: string) {
  try {
    const { error } = await supabase
      .from("photos")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting photo:", error);
    return false;
  }
}
