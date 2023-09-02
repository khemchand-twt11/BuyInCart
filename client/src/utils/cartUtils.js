export const updateCart = (state) => {
  // calculate cart items price
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty ? item.qty : 1),
    0
  )

  //calcualte shipping chages
  state.shippingPrice = state.itemsPrice > 599 ? 0 : 40

  //calculate tax charges
  state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2))

  //calculate total price
  state.totalPrice = Number(
    (
      Number(state.itemsPrice) +
      Number(state.taxPrice) +
      Number(state.shippingPrice)
    ).toFixed(2)
  )

  // storing in localstorage
  localStorage.setItem('cart', JSON.stringify(state))
  return state
}
