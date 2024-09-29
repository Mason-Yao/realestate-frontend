import React from "react"
import { Path, Svg } from "@react-pdf/renderer"

const Carpark = () => {
  return (
    <Svg width="20" height="16" viewBox="0 0 20 16">
      <Path
        stroke="#778899"
        d="M16.2159 5.68596L16.3417 6.00001H16.68H17C17.663 6.00001 18.2989 6.2634 18.7678 6.73224C19.2366 7.20109 19.5 7.83697 19.5 8.50001V11.5C19.5 11.6326 19.4473 11.7598 19.3536 11.8536C19.2598 11.9473 19.1326 12 19 12H18H17.5V12.5C17.5 13.1631 17.2366 13.7989 16.7678 14.2678C16.2989 14.7366 15.663 15 15 15C14.337 15 13.7011 14.7366 13.2322 14.2678C12.7634 13.7989 12.5 13.1631 12.5 12.5V12H12H8H7.5V12.5C7.5 13.1631 7.23661 13.7989 6.76777 14.2678C6.29893 14.7366 5.66304 15 5 15C4.33696 15 3.70107 14.7366 3.23223 14.2678C2.76339 13.7989 2.5 13.1631 2.5 12.5V12H2H1C0.867391 12 0.740214 11.9473 0.646447 11.8536C0.552679 11.7598 0.5 11.6326 0.5 11.5V8.50001C0.5 7.83697 0.763392 7.20109 1.23223 6.73224C1.70107 6.2634 2.33696 6.00001 3 6.00001H3.18H3.58959L3.67022 5.59843L4.19022 3.00843L4.19024 3.00834C4.30409 2.44072 4.61141 1.93021 5.05975 1.56394C5.50809 1.19767 6.06964 0.998353 6.64857 1.00001H6.65H12.6497C13.1479 1.00057 13.6347 1.14999 14.0474 1.4291C14.46 1.70817 14.7799 2.10416 14.966 2.56627C14.966 2.5664 14.9661 2.56654 14.9662 2.56668L16.2159 5.68596ZM11 2.00001H10.5V2.50001V5.50001V6.00001H11H14.52H15.2591L14.9841 5.31398L14.0345 2.94503C14.0345 2.94493 14.0344 2.94482 14.0344 2.94472C13.9242 2.66812 13.7341 2.43057 13.4885 2.26234C13.2427 2.09404 12.9524 2.00273 12.6545 2.00003V2.00001H12.65H11ZM5.17008 3.20011L5.16971 3.20195L4.72971 5.40195L4.6101 6.00001H5.22H9H9.5V5.50001V2.50001V2.00001H9H6.66453C6.31555 1.99427 5.97543 2.1104 5.7028 2.32851C5.42872 2.54777 5.24021 2.8562 5.17008 3.20011ZM18 11H18.5V10.5V8.50001C18.5 8.10219 18.342 7.72066 18.0607 7.43935C17.7794 7.15805 17.3978 7.00001 17 7.00001H3C2.60217 7.00001 2.22064 7.15805 1.93934 7.43935C1.65804 7.72066 1.5 8.10219 1.5 8.50001V10.5V11H2H2.78H3.00121L3.15 10.8363C3.38432 10.5785 3.66993 10.3725 3.98851 10.2316C4.3071 10.0906 4.65163 10.0178 5 10.0178C5.34837 10.0178 5.6929 10.0906 6.01149 10.2316C6.33007 10.3725 6.61568 10.5785 6.85 10.8363L6.99879 11H7.22H12.78H13.0012L13.15 10.8363C13.3843 10.5785 13.6699 10.3725 13.9885 10.2316C14.3071 10.0906 14.6516 10.0178 15 10.0178C15.3484 10.0178 15.6929 10.0906 16.0115 10.2316C16.3301 10.3725 16.6157 10.5785 16.85 10.8363L16.9988 11H17.22H18ZM4.16664 13.7472C4.41332 13.912 4.70333 14 5 14C5.39782 14 5.77935 13.842 6.06066 13.5607C6.34196 13.2794 6.5 12.8978 6.5 12.5C6.5 12.2033 6.41203 11.9133 6.2472 11.6667C6.08238 11.42 5.84811 11.2277 5.57403 11.1142C5.29994 11.0007 4.99834 10.971 4.70736 11.0288C4.41639 11.0867 4.14912 11.2296 3.93934 11.4394C3.72956 11.6491 3.5867 11.9164 3.52882 12.2074C3.47094 12.4983 3.50065 12.7999 3.61418 13.074C3.72771 13.3481 3.91997 13.5824 4.16664 13.7472ZM14.1666 13.7472C14.4133 13.912 14.7033 14 15 14C15.3978 14 15.7794 13.842 16.0607 13.5607C16.342 13.2794 16.5 12.8978 16.5 12.5C16.5 12.2033 16.412 11.9133 16.2472 11.6667C16.0824 11.42 15.8481 11.2277 15.574 11.1142C15.2999 11.0007 14.9983 10.971 14.7074 11.0288C14.4164 11.0867 14.1491 11.2296 13.9393 11.4394C13.7296 11.6491 13.5867 11.9164 13.5288 12.2074C13.4709 12.4983 13.5006 12.7999 13.6142 13.074C13.7277 13.3481 13.92 13.5824 14.1666 13.7472Z"
      />
    </Svg>
  )
}

export default Carpark