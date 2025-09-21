import { createSlice } from '@reduxjs/toolkit'; // Added missing import

const initialState = { // Fixed: added const
    items: []
}

const cartSlice = createSlice({ 
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1; // Fixed: increment by 1 instead of action.payload.quantity
            } else {
                state.items.push({...action.payload, quantity: 1});
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload.id);
        },
        clearCart: (state) => {
            state.items = [];
        },
        updateQuantity: (state, action) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                if (action.payload.quantity <= 0) {
                    // Remove item if quantity is 0 or less
                    state.items = state.items.filter(item => item.id !== action.payload.id);
                } else {
                    existingItem.quantity = action.payload.quantity;
                }
            }
        }
    }
});

export const { addItem, removeItem, clearCart, updateQuantity } = cartSlice.actions; // Added updateQuantity to exports
export default cartSlice.reducer;