export const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function apiFetch(path, { token, method = "GET", body } = {}) {
  const res = await fetch(API + path, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || "Something went wrong");
    err.status = res.status;
    err.code = data.code;
    throw err;
  }
  return data;
}

// Direct image upload to ImgBB (Challenge 3). Returns the hosted image URL.
export async function uploadToImgBB(file) {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, { method: "POST", body: form });
  const data = await res.json();
  if (!data.success) throw new Error("Image upload failed");
  return data.data.display_url;
}
