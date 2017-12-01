export default function discountMixin ({
  itemProp = 'item',
  discountProp = 'discount',
  priceProp = 'price',
  originalPriceProp = 'originalPrice',
} = {}) {
  return {
    computed: {
      [discountProp] () {
        const item = this[itemProp]
        const price = item[priceProp]
        const originalPrice = item[originalPriceProp]

        if (originalPrice) {
          return 1 - price / originalPrice
        }
        return 0
      },
    },
  }
}
