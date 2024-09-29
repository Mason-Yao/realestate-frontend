import { StyleSheet } from "@react-pdf/renderer"
import { Font } from "@react-pdf/renderer"
import NunitoLight from "./fonts/Nunito/Nunito-Light.ttf"
import Nunito from "./fonts/Nunito/Nunito-Regular.ttf"
import NunitoItalic from "./fonts/Nunito/Nunito-Italic.ttf"
import NunitoBold from "./fonts/Nunito/Nunito-Bold.ttf"
import DancingScript from "./fonts/DancingScript/DancingScript-Regular.ttf" // Handwriting font
import LongCang from "./fonts/Long_Cang/LongCang-Regular.ttf" // Handwriting font

Font.register({
  family: "Nunito",
  fonts: [{ src: NunitoLight, fontWeight: 300 }, { src: Nunito }, { src: NunitoItalic, fontStyle: "italic" }, { src: NunitoBold, fontWeight: 700 }],
})

Font.register({
  family: "Dancing Script",
  src: DancingScript,
})

Font.register({
  family: "LongCang",
  src: LongCang,
})

export const styles = StyleSheet.create({
  body: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  contentPage: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: "10 0",
  },
  pageHead: {
    position: "relative",
  },
  pageFooter: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    borderTop: "1 solid #ccc",
    padding: "10 24",
    fontSize: 10,
  },
  coverImg: {
    width: "100%",
    aspectRatio: 2,
  },
  coverPageHeader: {
    position: "absolute",
    width: "100%",
    padding: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 100,
    aspectRatio: 2.8,
  },
  coverPageReportName: {
    color: "white",
    fontSize: 24,
    fontWeight: 600,
    fontFamily: "Nunito",
  },
  header: {
    width: "100%",
    padding: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reportName: {
    color: "black",
    fontSize: 24,
    fontWeight: 600,
    fontFamily: "Nunito",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  // Typography
  signature: {
    fontWeight: 300,
    fontSize: 24,
    fontFamily: "Dancing Script",
  },
  covertextSmall: {
    fontWeight: 500,
    fontSize: 18,
    fontFamily: "Nunito",
  },
  covertext: {
    fontWeight: 600,
    fontSize: 20,
    fontFamily: "Nunito",
  },
  textSmall: {
    fontWeight: 300,
    fontSize: 12,
    fontFamily: "Nunito",
  },
  text: {
    fontWeight: 600,
    fontSize: 14,
    fontFamily: "Nunito",
  },
  textBig: {
    fontSize: 18,
    fontFamily: "Nunito",
    fontWeight: 700,
  },
  h1: {
    fontWeight: 700,
    fontSize: 24,
    fontFamily: "Nunito",
  },
  h2: {
    fontWeight: 700,
    fontSize: 16,
    fontFamily: "Nunito",
  },
  span: {
    fontWeight: 300,
    fontSize: 20,
    fontFamily: "Nunito",
  },
  spanBold: {
    fontWeight: 700,
    fontSize: 20,
    fontFamily: "Nunito",
  },
  textCenter: {
    textAlign: "center",
  },
  summaryTitle: {
    fontWeight: 700,
    fontSize: 16,
    fontFamily: "Nunito",
  },
  // Features
  // react-pdf does not support grid layout, manully create grid layout
  imageGrid: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  imageGridRow: {
    display: "flex",
    flexDirection: "row",
    gap: 3,
  },
  imageGridCol: {
    width: "33.33%",
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  coverImageBox: {
    width: "66.66%",
    aspectRatio: 21 / 9,
  },
  imageStackItemBox: {
    width: "100%",
    aspectRatio: 21 / 9,
  },
  imageItemBox: {
    width: "33.33%",
    aspectRatio: 21 / 9,
  },
  imageItem: {
    objectFit: "cover",
    objectPosition: "center",
  },
  imageStackPlaceholder: {
    width: "100%",
    aspectRatio: 21 / 9,
    backgroundColor: "gray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imagePlaceholder: {
    width: "33.33%",
    aspectRatio: 16 / 9,
    backgroundColor: "gray",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  propertylocation: {
    width: "75%",
    aspectRatio: 16 / 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  },
  // Utility classes
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  flexRowStart: {
    display: "flex",
    flexDirection: "row",
  },
  spaceAround: {
    justifyContent: "space-around",
  },
  spaceEven: {
    justifyContent: "space-evenly",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  itemsCenter: {
    alignItems: "center",
  },
  gap1: {
    gap: 8,
  },
  gap2: {
    gap: 16,
  },
  paddingOneLeftRight: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 16,
    paddingRight: 16,
  },
  paddingOne: {
    padding: 16,
  },
  minWidth: {
    minWidth: 100,
  },
  borderOne: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderColor: "black",
  },
  marginOne: {
    marginTop: 100,
  },
})
