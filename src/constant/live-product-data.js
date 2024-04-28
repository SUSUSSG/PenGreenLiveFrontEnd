import logo1 from "@/assets/images/all-img/logo1.png"
import logo2 from "@/assets/images/all-img/logo2.png"
import logo3 from "@/assets/images/all-img/logo3.png"

export const liveProductTable = [
    {
      productImg: "www.naver.com",
      auth: [
        {
          name: "logo1",
          image: logo1,
        },
        {
          name:"logo2",
          image: logo2
        },
      ],
      productName: "휴지",
      discountRate: "45",
      discountPrice: "13,500",
      originalPrice : "30,000",
      productCode: "A04B02" //상품번호 추가
    },
    {
        productImg: "www.daum.com",
        auth: [
          {
            name:"logo3",
            image: logo3
          },
        ],
        productName: "물티슈",
        discountRate: "25",
        discountPrice: "759",
        originalPrice: "3,000"
    }
]