import React from "react"
import { Text, View, Image } from "@react-pdf/renderer"
import { styles } from "../ReportStyles"
import LogoIcon from "../images/logo.png"

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.reportName}>Investment Report</Text>
      <Image src={LogoIcon} style={styles.logo} />
    </View>
  )
}

export default Header
