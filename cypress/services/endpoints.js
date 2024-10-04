export const Authentication = {
  authToken: '/token',
};

export const Orders = {
  submitOrders: '/orders',
  getOrderList:(orderId)=> `/orders/${orderId}`
};

export const eSIMs = {
  sims: '/sims',
  simsFilterLimit: '/sims?limit=20000',
};
