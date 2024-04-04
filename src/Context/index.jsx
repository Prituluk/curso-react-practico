import { createContext, useState, useEffect } from 'react'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {

  // user Creation and Storage
  const [inputName, setInputName] = useState('')
  const [inputEMail, setInputEMail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [userLogin, setUserLogin] = useState(false)

  // user information capturer
  const handleInputChangeName = (event) => {
    setInputName(event.target.value)
  }
  const handleInputChangeEMail = (event) => {
    setInputEMail(event.target.value)
  }
  const handleInputChangePassword = (event) => {
    setInputPassword(event.target.value)
  }
  useEffect(() => {
    const localStorageUser = window.localStorage.getItem('USER');
      if (localStorageUser) {
        const storedUserData = JSON.parse(localStorageUser)
        if (storedUserData.length > 0) {
          const {name, email, password, login} = storedUserData[0]
          setInputName(name)
          setInputEMail(email)
          setInputPassword(password)
          setUserLogin(login)
        }
      }
  }, [])
    // user session handling
    const unlog = () => {
      const updatedUser = {  name: inputName , email: inputEMail, password: inputPassword, login: false };
      window.localStorage.setItem('USER', JSON.stringify([updatedUser]));
      setUserLogin(false);
    }
    const logIn = () => {
      const updatedUser = { name: inputName , email: inputEMail, password: inputPassword, login: true };
      window.localStorage.setItem('USER', JSON.stringify([updatedUser]));
      setUserLogin(true)
    }

  // create/edit button management
  const [text, setText] = useState('Create')

  // Shopping Cart · Increment quantity
  const [count, setCount] = useState(0)

  // Product Detail · Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
  const openProductDetail = () => setIsProductDetailOpen(true)
  const closeProductDetail = () => setIsProductDetailOpen(false)

  // Checkout Side Menu · Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

  // Product Detail · Show product
  const [productToShow, setProductToShow] = useState({})

  // Shopping Cart · Add products to cart
  const [cartProducts, setCartProducts] = useState([])

  // Shopping Cart · Order
  const [order, setOrder] = useState([])

  // Get products
  const [items, setItems] = useState(null)
  const [filteredItems, setFilteredItems] = useState(null)

  // Get products by title
  const [searchByTitle, setSearchByTitle] = useState(null)

  // Get products by category
  const [searchByCategory, setSearchByCategory] = useState(null)




  useEffect(() => {
    fetch('https://api.escuelajs.co/api/v1/products')
      .then(response => response.json())
      .then(data => setItems(data))
  }, [])

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
  }

  const filteredItemsByCategory = (items, searchByCategory) => {
    return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
  }

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    if (searchType === 'BY_TITLE') {
      return filteredItemsByTitle(items, searchByTitle)
    }

    if (searchType === 'BY_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory)
    }

    if (searchType === 'BY_TITLE_AND_CATEGORY') {
      return filteredItemsByCategory(items, searchByCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
    }

    if (!searchType) {
      return items
    }
  }

  useEffect(() => {
    if (searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_TITLE_AND_CATEGORY', items, searchByTitle, searchByCategory))
    if (searchByTitle && !searchByCategory) setFilteredItems(filterBy('BY_TITLE', items, searchByTitle, searchByCategory))
    if (!searchByTitle && searchByCategory) setFilteredItems(filterBy('BY_CATEGORY', items, searchByTitle, searchByCategory))
    if (!searchByTitle && !searchByCategory) setFilteredItems(filterBy(null, items, searchByTitle, searchByCategory))
  }, [items, searchByTitle, searchByCategory])

  return (
    <ShoppingCartContext.Provider value={{
      count,
      setCount,
      openProductDetail,
      closeProductDetail,
      isProductDetailOpen,
      productToShow,
      setProductToShow,
      cartProducts,
      setCartProducts,
      isCheckoutSideMenuOpen,
      openCheckoutSideMenu,
      closeCheckoutSideMenu,
      order,
      setOrder,
      items,
      setItems,
      searchByTitle,
      setSearchByTitle,
      filteredItems,
      searchByCategory,
      setSearchByCategory,
      inputName,
      inputEMail,
      inputPassword,
      handleInputChangeName,
      handleInputChangeEMail,
      handleInputChangePassword,
      userLogin,
      setUserLogin,
      logIn,
      unlog,
      setText,
      text

    }}>
      {children}
    </ShoppingCartContext.Provider>
  )
}

