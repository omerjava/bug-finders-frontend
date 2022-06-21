export function pagination(allPages) {
  let displayedPages = [];

  if (allPages.length < 7) {
    displayedPages = allPages;
    return displayedPages;
  }

  displayedPages = [
    1,
    2,
    3,
    "...",
    allPages.length - 2,
    allPages.length - 1,
    allPages.length,
  ];

  return displayedPages;
}

export function updatePagination(currentPage, displayedPages, allPages) {
  if (allPages.length < 7) {
    displayedPages = allPages;
    return displayedPages;
  }

  if (currentPage === 1) {
    displayedPages[0] = 1;
    displayedPages[1] = 2;
    displayedPages[2] = 3;
    return displayedPages;
  } else if (currentPage === 2) {
    displayedPages[0] = 1;
    displayedPages[1] = 2;
    displayedPages[2] = 3;
    return displayedPages;
  } else if (currentPage > 1 && currentPage <= allPages.length / 2) {
    displayedPages[0] = currentPage - 2;
    displayedPages[1] = currentPage - 1;
    displayedPages[2] = currentPage;
    return displayedPages;
  } else if (currentPage === allPages.length) {
    displayedPages[4] = currentPage - 2;
    displayedPages[5] = currentPage - 1;
    displayedPages[6] = currentPage;
    return displayedPages;
  } else if (currentPage === allPages.length - 1) {
    displayedPages[4] = currentPage - 1;
    displayedPages[5] = currentPage;
    displayedPages[6] = currentPage + 1;
    return displayedPages;
  } else if (currentPage > allPages.length / 2) {
    displayedPages[4] = currentPage;
    displayedPages[5] = currentPage + 1;
    displayedPages[6] = currentPage + 2;
    return displayedPages;
  }
}
