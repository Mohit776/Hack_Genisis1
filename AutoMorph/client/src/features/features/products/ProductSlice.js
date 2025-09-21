import products from "../../../Data/Data/ProductsData"
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: products,
    filteredItems: products,
    searchTerm: "",
    selectedCategory: "All"
}

const filterProducts = (state) => { // Fixed: function name typo
  let filtered = state.items;
  
  // Filter by search term
  if (state.searchTerm) {
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  }
  
  // Filter by category
  if (state.selectedCategory !== "All") {
    filtered = filtered.filter(item => item.category === state.selectedCategory);
  }
  
  return filtered;
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredItems = filterProducts(state); // Fixed: function name
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filteredItems = filterProducts(state); // Fixed: function name
    },
  },
})

export const { setSearchTerm, setSelectedCategory } = productSlice.actions
export default productSlice.reducer