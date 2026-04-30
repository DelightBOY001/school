// RestDB.io - Simple REST Database
// Free tier: 3000 requests/month
// Sign up at: https://restdb.io

const API_KEY = process.env.NEXT_PUBLIC_RESTDB_API_KEY || "your-api-key";
const BASE_URL = process.env.NEXT_PUBLIC_RESTDB_URL || "https://schoolwebsite-1234.restdb.io/rest";

// Helper to generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// HTTP client for RestDB
async function restDBRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${BASE_URL}/${endpoint}`;
  const headers = {
    "Content-Type": "application/json",
    "x-apikey": API_KEY,
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("RestDB error:", error);
    throw error;
  }
}

// Site Config Functions
export async function getSiteConfig() {
  try {
    const data = await restDBRequest("siteconfig?q={\"id\":\"main\"}");
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error getting site config:", error);
    return null;
  }
}

export async function updateSiteConfig(config: any) {
  try {
    // Try to update existing
    const existing = await getSiteConfig();
    if (existing && existing._id) {
      await restDBRequest(`siteconfig/${existing._id}`, {
        method: "PUT",
        body: JSON.stringify({ ...config, id: "main" }),
      });
    } else {
      // Create new
      await restDBRequest("siteconfig", {
        method: "POST",
        body: JSON.stringify({ ...config, id: "main" }),
      });
    }
    return true;
  } catch (error) {
    console.error("Error updating site config:", error);
    return false;
  }
}

// Teachers Functions
export async function getTeachers() {
  try {
    return await restDBRequest("teachers?sort=name");
  } catch (error) {
    console.error("Error getting teachers:", error);
    return [];
  }
}

export async function addTeacher(teacher: any) {
  try {
    return await restDBRequest("teachers", {
      method: "POST",
      body: JSON.stringify({ ...teacher, id: generateId() }),
    });
  } catch (error) {
    console.error("Error adding teacher:", error);
    return null;
  }
}

export async function updateTeacher(id: string, teacher: any) {
  try {
    // Find by custom id first
    const teachers = await getTeachers();
    const existing = teachers.find((t: any) => t.id === id);
    if (existing && existing._id) {
      await restDBRequest(`teachers/${existing._id}`, {
        method: "PUT",
        body: JSON.stringify({ ...teacher, id }),
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating teacher:", error);
    return false;
  }
}

export async function deleteTeacher(id: string) {
  try {
    const teachers = await getTeachers();
    const existing = teachers.find((t: any) => t.id === id);
    if (existing && existing._id) {
      await restDBRequest(`teachers/${existing._id}`, {
        method: "DELETE",
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return false;
  }
}

// Principal Functions
export async function getPrincipal() {
  try {
    const data = await restDBRequest("principal?q={\"id\":\"main\"}");
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error getting principal:", error);
    return null;
  }
}

export async function updatePrincipal(principal: any) {
  try {
    const existing = await getPrincipal();
    if (existing && existing._id) {
      await restDBRequest(`principal/${existing._id}`, {
        method: "PUT",
        body: JSON.stringify({ ...principal, id: "main" }),
      });
    } else {
      await restDBRequest("principal", {
        method: "POST",
        body: JSON.stringify({ ...principal, id: "main" }),
      });
    }
    return true;
  } catch (error) {
    console.error("Error updating principal:", error);
    return false;
  }
}

// Photos Functions
export async function getPhotos() {
  try {
    return await restDBRequest("photos?sort=_created,desc");
  } catch (error) {
    console.error("Error getting photos:", error);
    return [];
  }
}

export async function addPhoto(photo: any) {
  try {
    return await restDBRequest("photos", {
      method: "POST",
      body: JSON.stringify({ ...photo, id: generateId() }),
    });
  } catch (error) {
    console.error("Error adding photo:", error);
    return null;
  }
}

export async function deletePhoto(id: string) {
  try {
    const photos = await getPhotos();
    const existing = photos.find((p: any) => p.id === id);
    if (existing && existing._id) {
      await restDBRequest(`photos/${existing._id}`, {
        method: "DELETE",
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting photo:", error);
    return false;
  }
}

// News Functions
export async function getNews() {
  try {
    return await restDBRequest("news?sort=_created,desc");
  } catch (error) {
    console.error("Error getting news:", error);
    return [];
  }
}

export async function addNews(news: any) {
  try {
    return await restDBRequest("news", {
      method: "POST",
      body: JSON.stringify({ ...news, id: generateId(), date: new Date().toISOString().split('T')[0] }),
    });
  } catch (error) {
    console.error("Error adding news:", error);
    return null;
  }
}

export async function updateNews(id: string, news: any) {
  try {
    const allNews = await getNews();
    const existing = allNews.find((n: any) => n.id === id);
    if (existing && existing._id) {
      await restDBRequest(`news/${existing._id}`, {
        method: "PUT",
        body: JSON.stringify({ ...news, id }),
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating news:", error);
    return false;
  }
}

export async function deleteNews(id: string) {
  try {
    const allNews = await getNews();
    const existing = allNews.find((n: any) => n.id === id);
    if (existing && existing._id) {
      await restDBRequest(`news/${existing._id}`, {
        method: "DELETE",
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting news:", error);
    return false;
  }
}

// Testimonials Functions
export async function getTestimonials() {
  try {
    return await restDBRequest("testimonials?sort=_created,desc");
  } catch (error) {
    console.error("Error getting testimonials:", error);
    return [];
  }
}

export async function addTestimonial(testimonial: any) {
  try {
    return await restDBRequest("testimonials", {
      method: "POST",
      body: JSON.stringify({ ...testimonial, id: generateId() }),
    });
  } catch (error) {
    console.error("Error adding testimonial:", error);
    return null;
  }
}

export async function deleteTestimonial(id: string) {
  try {
    const testimonials = await getTestimonials();
    const existing = testimonials.find((t: any) => t.id === id);
    if (existing && existing._id) {
      await restDBRequest(`testimonials/${existing._id}`, {
        method: "DELETE",
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return false;
  }
}

// Inquiries Functions
export async function getInquiries() {
  try {
    return await restDBRequest("inquiries?sort=_created,desc");
  } catch (error) {
    console.error("Error getting inquiries:", error);
    return [];
  }
}

export async function addInquiry(inquiry: any) {
  try {
    return await restDBRequest("inquiries", {
      method: "POST",
      body: JSON.stringify({ 
        ...inquiry, 
        id: generateId(), 
        status: "new",
        date: new Date().toISOString().split('T')[0]
      }),
    });
  } catch (error) {
    console.error("Error adding inquiry:", error);
    return null;
  }
}

export async function updateInquiryStatus(id: string, status: string) {
  try {
    const inquiries = await getInquiries();
    const existing = inquiries.find((i: any) => i.id === id);
    if (existing && existing._id) {
      await restDBRequest(`inquiries/${existing._id}`, {
        method: "PUT",
        body: JSON.stringify({ ...existing, status }),
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return false;
  }
}

export async function deleteInquiry(id: string) {
  try {
    const inquiries = await getInquiries();
    const existing = inquiries.find((i: any) => i.id === id);
    if (existing && existing._id) {
      await restDBRequest(`inquiries/${existing._id}`, {
        method: "DELETE",
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return false;
  }
}

// Admission Inquiries Functions
export async function getAdmissionInquiries() {
  try {
    return await restDBRequest("admissioninquiries?sort=_created,desc");
  } catch (error) {
    console.error("Error getting admission inquiries:", error);
    return [];
  }
}

export async function addAdmissionInquiry(inquiry: any) {
  try {
    return await restDBRequest("admissioninquiries", {
      method: "POST",
      body: JSON.stringify({ 
        ...inquiry, 
        id: generateId(), 
        status: "new",
        date: new Date().toISOString().split('T')[0]
      }),
    });
  } catch (error) {
    console.error("Error adding admission inquiry:", error);
    return null;
  }
}

export async function updateAdmissionInquiryStatus(id: string, status: string) {
  try {
    const inquiries = await getAdmissionInquiries();
    const existing = inquiries.find((i: any) => i.id === id);
    if (existing && existing._id) {
      await restDBRequest(`admissioninquiries/${existing._id}`, {
        method: "PUT",
        body: JSON.stringify({ ...existing, status }),
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating admission inquiry:", error);
    return false;
  }
}

export async function deleteAdmissionInquiry(id: string) {
  try {
    const inquiries = await getAdmissionInquiries();
    const existing = inquiries.find((i: any) => i.id === id);
    if (existing && existing._id) {
      await restDBRequest(`admissioninquiries/${existing._id}`, {
        method: "DELETE",
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error deleting admission inquiry:", error);
    return false;
  }
}
