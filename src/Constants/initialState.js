export const initialState = {
    products: {
        products: [],
        error: '',
    },
    category: {
        category: [],
        activeCategory: 0,
        error: '',
    },
    order: {
        orderList: JSON.parse(localStorage.getItem('order') || '[]'),
        orderGoods: [],
        totalPrice: 0,
        totalCount: 0,
        error: '',
    },
    delivery: {
        name: '',
        phone: '',
        format: 'delivery',
        address: '',
        floor: '',
        intercom: '',
        error: '',
    },

};