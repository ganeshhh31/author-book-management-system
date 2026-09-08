import "@hotwired/turbo-rails"

import "controllers"


document.addEventListener("turbo:load", () => {

  // =============================
  // AUTHOR DROPDOWN
  // =============================

  const authorSelector = document.querySelector(".author-selector")

  if (authorSelector) {

    const dropdownButton = authorSelector.querySelector(".author-dropdown-button")
    const dropdown = authorSelector.querySelector(".author-dropdown")
    const searchInput = authorSelector.querySelector(".author-search")
    const authorOptions = authorSelector.querySelectorAll(".author-option")


    // Open / Close dropdown
    dropdownButton.addEventListener("click", () => {

      dropdown.classList.toggle("show-dropdown")

    })


    // Search authors inside dropdown
    searchInput.addEventListener("input", () => {

      const searchValue = searchInput.value
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim()

      authorOptions.forEach((option) => {

        const authorName = option.textContent
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim()

        if (authorName.includes(searchValue)) {
          option.style.display = "flex"
        } else {
          option.style.display = "none"
        }

      })

    })


    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {

      if (!authorSelector.contains(event.target)) {
        dropdown.classList.remove("show-dropdown")
      }

    })

  }


  // =============================
  // BOOK LIST SEARCH
  // =============================

  const bookSearch = document.querySelector("#book-search")
  const bookItems = document.querySelectorAll(".book-item")
  const bookNotFound = document.querySelector("#book-not-found")

  if (bookSearch) {

    bookSearch.addEventListener("input", () => {

      const searchValue = bookSearch.value
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim()

      let found = false

      bookItems.forEach((book) => {

        const bookTitle = book.textContent
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim()

        if (bookTitle.includes(searchValue)) {

          book.style.display = "block"
          found = true

        } else {

          book.style.display = "none"

        }

      })


      // Show Book not found only when user types something
      if (searchValue !== "" && !found) {
        bookNotFound.style.display = "block"
      } else {
        bookNotFound.style.display = "none"
      }

    })

  }

// Author search //


  const authorSearch = document.querySelector("#author-search")
  const authorItems = document.querySelectorAll(".author-item")
  const authorNotFound = document.querySelector("#author-not-found")

  if (authorSearch) {

    authorSearch.addEventListener("input", () => {

      const searchValue = authorSearch.value
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim()

      let found = false

      authorItems.forEach((author) => {

        const authorName = author.textContent
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim()

        if (authorName.includes(searchValue)) {

          author.style.display = "block"
          found = true

        } else {

          author.style.display = "none"

        }

      })


      if (searchValue !== "" && !found) {
        authorNotFound.style.display = "block"
      } else {
        authorNotFound.style.display = "none"
      }

    })

  }

})