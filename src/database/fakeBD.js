const FakeDatabase = (() => {
  const data = [
    { id: 1, latitude: -21.7728776, longitude: -43.3398956 },
    { id: 2, latitude: -21.7665523, longitude: -43.3417837 },
    { id: 3, latitude: -21.7594133, longitude: -43.3549542 },
    { id: 4, latitude: -21.7688363, longitude: -43.3645106 },
    { id: 5, latitude: -21.7855824, longitude: -43.3064706 },
    { id: 6, latitude: -21.7702177, longitude: -43.3769861 },
    { id: 7, latitude: -21.7478412, longitude: -43.3795695 },
    { id: 8, latitude: -21.72136, longitude: -43.3495615 },
    { id: 9, latitude: -21.7137445, longitude: -43.3312189 },
    { id: 10, latitude: -21.7564765, longitude: -43.3543269 },
    { id: 11, latitude: -21.7617449, longitude: -43.3454537 },
    { id: 12, latitude: -21.7660792, longitude: -43.3420097 },
    { id: 13, latitude: -21.7706925, longitude: -43.3514404 },
    { id: 14, latitude: -21.7747775, longitude: -43.357352 },
    { id: 15, latitude: -21.7788325, longitude: -43.3563864 },
    { id: 16, latitude: -21.7818513, longitude: -43.3437263 },
    { id: 17, latitude: -21.7820505, longitude: -43.3645106 },
    { id: 18, latitude: -21.7799686, longitude: -43.3346676 },
    { id: 19, latitude: -21.7748076, longitude: -43.3284786 },
    { id: 20, latitude: -21.7712312, longitude: -43.3232256 },
    { id: 21, latitude: -21.7705338, longitude: -43.3155759 },
    { id: 22, latitude: -21.7748181, longitude: -43.3116384 },
    { id: 23, latitude: -21.7798295, longitude: -43.3085485 },
    { id: 24, latitude: -21.7525223, longitude: -43.3258784 },
    // { id: 25, latitude: -21.7477413, longitude: -43.3366779 },
  ];

  return {
    getData(id) {
      return data.filter(({ id: dataID }) => id === dataID)[0] || {};
    },
    getAllData() {
      return data;
    },
  };
})();
