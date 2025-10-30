export const Api_End_Point = "https://dezvolta.in/artisticks/";
export const current_url = "https://artisticks.vercel.app/";


export async function HomeApiFn() {
    const url = `${Api_End_Point}wp-json/wp/v2/pages?slug=home&_embed&acf_format=standard`;

    try {
        const response = await fetch(url, { next: { revalidate: 30 } });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data ?? [];
    } catch (error) {
        console.error("Error fetching service data:", error);
        return [];
    }
}


export async function ProductsApiFn() {
    const url = `${Api_End_Point}wp-json/wp/v2/pages?slug=products&_embed&acf_format=standard`;

    try {
        const response = await fetch(url, { next: { revalidate: 30 } });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data ?? [];
    } catch (error) {
        console.error("Error fetching service data:", error);
        return [];
    }
}

// Contact Us API
export async function ContactApiFn() {
    const url = `${Api_End_Point}wp-json/wp/v2/pages?slug=contact-us&_embed&acf_format=standard`;

    try {
        const response = await fetch(url, { next: { revalidate: 30 } });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data ?? [];
    } catch (error) {
        console.error("Error fetching service data:", error);
        return [];
    }
}


export async function FooterApiFn() {
    const url = `${Api_End_Point}wp-json/acf/options/v1/footer`;

    try {
        const response = await fetch(url, { next: { revalidate: 30 } });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data ?? [];
    } catch (error) {
        console.error("Error fetching service data:", error);
        return [];
    }
}


export async function WorksApiFn() {
    const url = `${Api_End_Point}wp-json/wp/v2/works?slug=&_embed&acf_format=standard&per_page=100`;

    try {
        const response = await fetch(url, { next: { revalidate: 30 } });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data ?? [];
    } catch (error) {
        console.error("Error fetching service data:", error);
        return [];
    }
}

export async function AboutApiFn() {
    const url = `${Api_End_Point}wp-json/wp/v2/pages?slug=about-us&_embed&acf_format=standard`;

    try {
        const response = await fetch(url, { next: { revalidate: 30 } });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data ?? [];
    } catch (error) {
        console.error("Error fetching service data:", error);
        return [];
    }
}


export async function BlogSingleFunction(slug) {
  // ✅ Fixed query parameter
  const url = `${Api_End_Point}wp-json/wp/v2/posts?slug=${slug}&_embed&acf_format=standard&per_page=100`;

  try {
    const response = await fetch(url, { next: { revalidate: 30 } });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.length > 0 ? data[0] : null; // Return first matching post
  } catch (error) {
    console.error("Error fetching service data:", error.message);
    return null;
  }
}



export async function BlogApiFn() {
  const url = `${Api_End_Point}wp-json/wp/v2/posts?_embed&acf_format=standard&per_page=100`;

  try {
    const response = await fetch(url, { next: { revalidate: 30 } });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching BlogApiFn data:", error.message);
    return [];
  }
}
