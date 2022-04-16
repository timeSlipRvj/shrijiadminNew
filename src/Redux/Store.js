import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { getTagsReducer, compareProductsReducer} from './Reducers/ProductReducers'
import {getGeneralReducer, getFooterReducer, getProductTabsReducer, getFeaturedCategoriesTabsReducer, getFeaturesReducer, getLogosReducer, getBannersReducer, getBrandsReducer, getTopBrandsReducer, getTopCategoriesReducer, getClientReviewsReducer} from './Reducers/StorefrontReducer'
import {getAllCategoriesReducer, getSectionProductsReducer} from './Reducers/CategoryReducers'
import {getPageReducer} from './Reducers/PageReducers'
import {loginUser, getUserDetailsReducer, editUserDetailsReducer, userOrdersReducers} from './Reducers/UserReducers'
import {getMenuReducer} from './Reducers/MenuReducers'
import {wishlistReducer} from './Reducers/WishlistReducers'
import {cartReducer} from './Reducers/CartReducers'
import { saveOrderReducer} from './Reducers/OrderReducers'
import {getSettingsReducer} from './Reducers/SettingsReducer'
import {getBlogsReducer} from './Reducers/BlogReducers'

const reducers = combineReducers({
    getStore: getGeneralReducer,
    getFooter: getFooterReducer,
    getLogos: getLogosReducer,  
    getProductTabs: getProductTabsReducer,
    getFeaturedCategoriesTabs: getFeaturedCategoriesTabsReducer,
    getFeatures: getFeaturesReducer,
    getCategories: getAllCategoriesReducer,
    getPage: getPageReducer,
    getMenus: getMenuReducer,
    getSectionProducts: getSectionProductsReducer,
    getTags: getTagsReducer,
    loginUser: loginUser,
    getUser: getUserDetailsReducer,
    editUser: getUserDetailsReducer,
    userWishlist: wishlistReducer,
    userCart: cartReducer,
    getBanners: getBannersReducer,
    getBrands: getBrandsReducer,
    getTopBrands: getTopBrandsReducer,
    getTopCategories: getTopCategoriesReducer,
    getClientReviews: getClientReviewsReducer,
    saveOrder: saveOrderReducer,
    getSettings: getSettingsReducer,
    getBlogs: getBlogsReducer,
    userOrders: userOrdersReducers,
    compareProducts: compareProductsReducer,
})


const Store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk)),
)

export default Store;