import React from "react"
import { Text, View } from "@react-pdf/renderer"
import moment from "moment"
import { styles } from "../ReportStyles"

const Footer = () => (
  <View style={styles.pageFooter}>
    <Text>&copy; Copyright {moment().year()} HomeVal, All rights reserved.</Text>
    <Text render={({ pageNumber }) => `Page ${pageNumber}`} />
  </View>
)

export default Footer
