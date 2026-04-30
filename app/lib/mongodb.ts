// MongoDB Atlas Data API - Free tier available
// Sign up at: https://www.mongodb.com/cloud/atlas
// Free tier: 512MB storage, shared RAM

const DATA_API_KEY = process.env.NEXT_PUBLIC_MONGODB_API_KEY || "your-data-api-key";
const DATA_API_URL = process.env.NEXT_PUBLIC_MONGODB_URL || "https://data.mongodb-api.com/app/your-app-id/endpoint/data/v1";
const DATABASE_NAME = process.env.NEXT_PUBLIC_MONGODB_DB || "schoolwebsite";

// Helper to make MongoDB Data API requests
async function mongoRequest(action: string, collection: string, body: any = {}) {
  const url = `${DATA_API_URL}/action/${action}`;
  
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key": DATA_API_KEY,
      },
      body: JSON.stringify({
        dataSource: "Cluster0",
        database: DATABASE_NAME,
        collection: collection,
        ...body,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`MongoDB error: ${error}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`MongoDB ${action} error:`, error);
    throw error;
  }
}

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Site Config Functions
export async function getSiteConfig() {
  try {
    const result = await mongoRequest("findOne", "siteconfig", {
      filter: { id: "main" },
    });
    return result?.document || null;
  } catch (error) {
    console.error("Error getting site config:", error);
    return null;
  }
}

export async function updateSiteConfig(config: any) {
  try {
    await mongoRequest("updateOne", "siteconfig", {
      filter: { id: "main" },
      update: { $set: { ...config, id: "main" } },
      upsert: true,
    });
    return true;
  } catch (error) {
    console.error("Error updating site config:", error);
    return false;
  }
}

// Teachers Functions
export async function getTeachers() {
  try {
    const result = await mongoRequest("find", "teachers", {
      sort: { name: 1 },
    });
    return result?.documents || [];
  } catch (error) {
    console.error("Error getting teachers:", error);
    return [];
  }
}

export async function addTeacher(teacher: any) {
  try {
    const newTeacher = { ...teacher, id: generateId() };
    await mongoRequest("insertOne", "teachers", {
      document: newTeacher,
    });
    return newTeacher;
  } catch (error) {
    console.error("Error adding teacher:", error);
    return null;
  }
}

export async function updateTeacher(id: string, teacher: any) {
  try {
    await mongoRequest("updateOne", "teachers", {
      filter: { id },
      update: { $set: teacher },
    });
    return true;
  } catch (error) {
    console.error("Error updating teacher:", error);
    return false;
  }
}

export async function deleteTeacher(id: string) {
  try {
    await mongoRequest("deleteOne", "teachers", {
      filter: { id },
    });
    return true;
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return false;
  }
}

// Principal Functions
export async function getPrincipal() {
  try {
    const result = await mongoRequest("findOne", "principal", {
      filter: { id: "main" },
    });
    return result?.document || null;
  } catch (error) {
    console.error("Error getting principal:", error);
    return null;
  }
}

export async function updatePrincipal(principal: any) {
  try {
    await mongoRequest("updateOne", "principal", {
      filter: { id: "main" },
      update: { $set: { ...principal, id: "main" } },
      upsert: true,
    });
    return true;
  } catch (error) {
    console.error("Error updating principal:", error);
    return false;
  }
}

// Photos Functions
export async function getPhotos() {
  try {
    const result = await mongoRequest("find", "photos", {
      sort: { _id: -1 },
    });
    return result?.documents || [];
  } catch (error) {
    console.error("Error getting photos:", error);
    return [];
  }
}

export async function addPhoto(photo: any) {
  try {
    const newPhoto = { ...photo, id: generateId() };
    await mongoRequest("insertOne", "photos", {
      document: newPhoto,
    });
    return newPhoto;
  } catch (error) {
    console.error("Error adding photo:", error);
    return null;
  }
}

export async function deletePhoto(id: string) {
  try {
    await mongoRequest("deleteOne", "photos", {
      filter: { id },
    });
    return true;
  } catch (error) {
    console.error("Error deleting photo:", error);
    return false;
  }
}

// News Functions
export async function getNews() {
  try {
    const result = await mongoRequest("find", "news", {
      sort: { _id: -1 },
    });
    return result?.documents || [];
  } catch (error) {
    console.error("Error getting news:", error);
    return [];
  }
}

export async function addNews(news: any) {
  try {
    const newNews = { ...news, id: generateId(), date: new Date().toISOString().split('T')[0] };
    await mongoRequest("insertOne", "news", {
      document: newNews,
    });
    return newNews;
  } catch (error) {
    console.error("Error adding news:", error);
    return null;
  }
}

export async function updateNews(id: string, news: any) {
  try {
    await mongoRequest("updateOne", "news", {
      filter: { id },
      update: { $set: news },
    });
    return true;
  } catch (error) {
    console.error("Error updating news:", error);
    return false;
  }
}

export async function deleteNews(id: string) {
  try {
    await mongoRequest("deleteOne", "news", {
      filter: { id },
    });
    return true;
  } catch (error) {
    console.error("Error deleting news:", error);
    return false;
  }
}

// Testimonials Functions
export async function getTestimonials() {
  try {
    const result = await mongoRequest("find", "testimonials", {
      sort: { _id: -1 },
    });
    return result?.documents || [];
  } catch (error) {
    console.error("Error getting testimonials:", error);
    return [];
  }
}

export async function addTestimonial(testimonial: any) {
  try {
    const newTestimonial = { ...testimonial, id: generateId() };
    await mongoRequest("insertOne", "testimonials", {
      document: newTestimonial,
    });
    return newTestimonial;
  } catch (error) {
    console.error("Error adding testimonial:", error);
    return null;
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await mongoRequest("deleteOne", "testimonials", {
      filter: { id },
    });
    return true;
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return false;
  }
}

// Inquiries Functions
export async function getInquiries() {
  try {
    const result = await mongoRequest("find", "inquiries", {
      sort: { _id: -1 },
    });
    return result?.documents || [];
  } catch (error) {
    console.error("Error getting inquiries:", error);
    return [];
  }
}

export async function addInquiry(inquiry: any) {
  try {
    const newInquiry = { 
      ...inquiry, 
      id: generateId(), 
      status: "new",
      date: new Date().toISOString().split('T')[0],
    };
    await mongoRequest("insertOne", "inquiries", {
      document: newInquiry,
    });
    return newInquiry;
  } catch (error) {
    console.error("Error adding inquiry:", error);
    return null;
  }
}

export async function updateInquiryStatus(id: string, status: string) {
  try {
    await mongoRequest("updateOne", "inquiries", {
      filter: { id },
      update: { $set: { status } },
    });
    return true;
  } catch (error) {
    console.error("Error updating inquiry:", error);
    return false;
  }
}

export async function deleteInquiry(id: string) {
  try {
    await mongoRequest("deleteOne", "inquiries", {
      filter: { id },
    });
    return true;
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    return false;
  }
}

// Admission Inquiries Functions
export async function getAdmissionInquiries() {
  try {
    const result = await mongoRequest("find", "admissioninquiries", {
      sort: { _id: -1 },
    });
    return result?.documents || [];
  } catch (error) {
    console.error("Error getting admission inquiries:", error);
    return [];
  }
}

export async function addAdmissionInquiry(inquiry: any) {
  try {
    const newInquiry = { 
      ...inquiry, 
      id: generateId(), 
      status: "new",
      date: new Date().toISOString().split('T')[0],
    };
    await mongoRequest("insertOne", "admissioninquiries", {
      document: newInquiry,
    });
    return newInquiry;
  } catch (error) {
    console.error("Error adding admission inquiry:", error);
    return null;
  }
}

export async function updateAdmissionInquiryStatus(id: string, status: string) {
  try {
    await mongoRequest("updateOne", "admissioninquiries", {
      filter: { id },
      update: { $set: { status } },
    });
    return true;
  } catch (error) {
    console.error("Error updating admission inquiry:", error);
    return false;
  }
}

export async function deleteAdmissionInquiry(id: string) {
  try {
    await mongoRequest("deleteOne", "admissioninquiries", {
      filter: { id },
    });
    return true;
  } catch (error) {
    console.error("Error deleting admission inquiry:", error);
    return false;
  }
}
