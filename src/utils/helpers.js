
export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

export const generateShareLink = (item) => {
  const params = new URLSearchParams();
  params.set('type', item.type);
  params.set('id', item.id);
  // In a real app we'd need a way to fetch a specific item by ID for some APIs
  // For this playground, we'll just encode basic data for simplicity in sharing
  if (item.type === 'fact') params.set('text', item.text);
  if (item.type === 'dog') params.set('url', item.url);
  
  return `${window.location.origin}/?${params.toString()}`;
};
