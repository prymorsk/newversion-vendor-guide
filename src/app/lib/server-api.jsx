export async function getCategories() {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}category`, { next: { revalidate: 3600 } });
    if (res.status === 429) {
        // Handle rate limit exceeded, maybe implement retry logic
        //console.warn('Rate limit exceeded. Retry after some time.');
     return null; // or throw an error
    }

    if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
    }
    //const clonedResponse = res.clone();  // Clone the response
    const vendorRes = await res.json()
    return vendorRes;
}
export async function getStates() {
    const resSta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}state`, { next: { revalidate: 3600 } });
    if (resSta.status === 429) {
        // Handle rate limit exceeded, maybe implement retry logic
        //console.warn('Rate limit exceeded. Retry after some time.');
        return null; // or throw an error
    }

    if (!resSta.ok) {
        throw new Error(`API request failed with status: ${resSta.status}`);
    }
    //const clonedResponse = resSta.clone();  // Clone the response
    return await resSta.json()
}
export async function getMagazines() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}magazine`, { next: { revalidate: 3600 } });
    if (res.status === 429) {
        // Handle rate limit exceeded, maybe implement retry logic
        //console.warn('Rate limit exceeded. Retry after some time.');
        return null; // or throw an error
    }
    if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
    }
    //const clonedResponse = res.clone();  // Clone the response
    const vendorRes = await res.json()
    return vendorRes;
}

export async function getBlogs() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}blog-home?limit=4&offset=0`,{ next: { revalidate: 3600 }});
    if (res.status === 429) {
        // Handle rate limit exceeded, maybe implement retry logic
        //console.warn('Rate limit exceeded. Retry after some time.');
        return null; // or throw an error
    }
    if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
    }
    //const clonedResponse = res.clone();  // Clone the response
    const blogRes = await res.json()
    //console.log('blog...');
    //console.log(blogRes);
    return blogRes;
}


export async function getVendors(props = {}) {
    const {
        state_id = "",
        stateName = "",
        city = "",
        latitude = 0,
        longitude = 0,
        limit = 5,
        offset = 0
    } = props;

    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}vendor-advertisement`;

    const url = new URL(baseUrl);

    url.searchParams.set("limit", limit);
    url.searchParams.set("offset", offset);
    url.searchParams.set("state_id", state_id);
    url.searchParams.set("state_name", stateName);
    url.searchParams.set("city_name", city);
    url.searchParams.set("latitude", latitude);
    url.searchParams.set("longitude", longitude);

    const res = await fetch(url.toString(), {
        // Cache for 1 hour (useful for Next.js App Router)
        next: { revalidate: 3600 }
    });

    if (res.status === 429) {
        // Rate limit exceeded
        return null;
    }

    if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
    }

    return res.json();
}

 
export async function getVendors_old(props) {
    
    let state_id='' ;
    let state_name='' ;
    let city_name='' ;
    
    if (props && props.state_id !== undefined ) {
        state_id=props.state_id;
    } 
    if (props && props.stateName !== undefined ) {
        state_name=props.stateName;
    } 
    if (props && props.city !== undefined ) {
        city_name=props.city;
    } 
    
    let url = `${process.env.NEXT_PUBLIC_API_URL}vendor-advertisement?limit=5&offset=0&state_id=`+state_id+`&state_name=`+state_name+`&city_name=`+city_name;
    // console.log('url hai',url)
    if (props && props.latitude !== undefined && props.longitude !== undefined) {
        url += `&latitude=${props.latitude}&longitude=${props.longitude}`;
    } else {
        url += `&latitude=0&longitude=0`;
    }

    const res = await fetch(url, {
        next: { revalidate: 3600 }
    });

    if (res.status === 429) {
        // Handle rate limit exceeded, maybe implement retry logic
        //console.warn('Rate limit exceeded. Retry after some time.');
        return null; // or throw an error
    }
    if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
    }

     //const clonedResponse = res.clone();  // Clone the response
     const vendorRes = await res.json();
    return vendorRes;
}

export async function getPages(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}page/${slug}`,
      { next: { revalidate: 3600 } }
    );

    // Handle rate-limit (429)
    if (res.status === 429) {
      // Optional: you can implement a retry here
      console.warn('Rate limit exceeded. Try again later.');
      return null;
    }

    // Handle all other non-200 responses
    if (!res.ok) {
      throw new Error(`API request failed with status: ${res.status}`);
    }

    // Parse JSON response
    const data = await res.json();
    return data;

  } catch (error) {
    console.error('Error fetching page:', error);
    return null; // or rethrow if you prefer: throw error;
  }
}




export  async function getPages_old(slug) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}page/${slug}`, { next: { revalidate: 3600 } });
     if (res.status === 429) {
        // Handle rate limit exceeded, maybe implement retry logic
       // console.warn('Rate limit exceeded. Retry after some time.');
        return null; // or throw an error
    }
    if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
    }
     //const clonedResponse = res.clone();  // Clone the response
     const pageRes = await res.json();
    return pageRes;
}

export async function getPostMeta() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}post-meta`, { next: { revalidate: 3600 } });
    if (res.status === 429) {
        // Handle rate limit exceeded, maybe implement retry logic
        //console.warn('Rate limit exceeded. Retry after some time.');
        return null; // or throw an error
    }
    if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
    }
    //const clonedResponse = res.clone();  // Clone the response
    const pageMetaRes = await res.json()
    return pageMetaRes;
}

export async function getWebsiteSetting() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}website_setting`, { next: { revalidate: 10 } });
    if (res.status === 429) {
        // Handle rate limit exceeded, maybe implement retry logic
        //console.warn('Rate limit exceeded. Retry after some time.');
        return null; // or throw an error
    }
    if (!res.ok) {
        throw new Error(`API request failed with status: ${res.status}`);
    }
    const siteSettingRes = await res.json()
    return siteSettingRes;
}

export  async function getMagazineData(slug) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}magazine/${slug}`, { next: { revalidate: 3600 } });
    if (res.status === 429) {return null; }
    //const clonedResponse = res.clone();  // Clone the response
    const magazineDataRes = await res.json()
    return magazineDataRes;
}

export  async function getMagazineAllData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}magazine`, { next: { revalidate: 3600 } });
    if (res.status === 429) {return null; }
    //const clonedResponse = res.clone();  // Clone the response
    const magazineAllDataRes = await res.json()
    return magazineAllDataRes;
}
