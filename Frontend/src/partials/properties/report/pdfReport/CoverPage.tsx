import React from "react"
import { Image, Page, Text, View } from "@react-pdf/renderer"
import { agent } from "../constants"
import { styles } from "./ReportStyles"
import LogoIcon from "./images/logo.png"
import CoverImg from "./images/main.jpg"
import moment from "moment"
import Footer from "./components/Footer"
import { Property } from "../../../../../../Shared/Interface/property"
import { ReportClientData } from "../../../../interfaces/properties"
import { getAddressString } from "../../../../utils/helper"
//import { IClientState } from "../../../redux/reducers/types";

interface IProps {
  propertyData: Property
  clientData: ReportClientData
}

const CoverPage = ({ propertyData, clientData }: IProps) => {
  return (
    <Page style={styles.body}>
      <View style={styles.pageHead}>
        <Image src={CoverImg} style={styles.coverImg} />
        <View style={styles.coverPageHeader}>
          <Text style={styles.coverPageReportName}>Investment Report</Text>
          <Image src={LogoIcon} style={styles.logo} />
        </View>
      </View>
      <View style={styles.paddingOne}>
        <View style={[styles.flexCol, styles.gap2]}>
          <View style={[styles.flexCol, styles.itemsCenter]}>
            <Text style={styles.h1}>{getAddressString(propertyData.address)}</Text>
            <View style={[styles.flexRow, styles.gap1]}>
              <Text style={styles.span}>Prepared on:</Text>
              <Text style={styles.spanBold}>{moment(new Date()).format("DD-MMM-YYYY")}</Text>
            </View>
          </View>
          <View style={[styles.flexRow, styles.spaceEven]}>
            <View style={[styles.flexCol, styles.gap1, styles.marginOne]}>
              <View style={[styles.flexRow, styles.gap1]}>
                <Text style={styles.covertext}>Agent:</Text>
                <Text style={styles.signature}>{agent.name}</Text>
              </View>
              <Text style={styles.covertextSmall}>{agent.position}</Text>
              <Text style={styles.covertextSmall}>{agent.address.line1}</Text>
              <Text style={styles.covertextSmall}>{agent.address.line2}</Text>
              <Text style={styles.covertextSmall}>{agent.phone}</Text>
              <Text style={styles.covertextSmall}>{agent.email}</Text>
            </View>
            <View style={[styles.flexCol, styles.gap1, styles.marginOne]}>
              <View style={[styles.flexRow, styles.gap1]}>
                <Text style={styles.covertext}>Client:</Text>
                <Text style={{ ...styles.signature, fontFamily: /[\u4e00-\u9fa5]/.test(clientData.name) ? "LongCang" : "Dancing Script" }}>
                  {clientData.name}
                </Text>
              </View>
              {clientData.name && (
                <>
                  <Text style={styles.covertextSmall}>{`ForeignBuyer: ${clientData.foreignBuyer ? "Yes" : "No"}`}</Text>
                  <Text style={styles.covertextSmall}>{`FirstHomeBuyer: ${clientData.firstHomeBuyer ? "Yes" : "No"}`}</Text>
                  <Text style={styles.covertextSmall}>{`InvestmentType: ${clientData.investmentType}`}</Text>
                  <Text style={styles.covertextSmall}>{clientData.phone}</Text>
                  <Text style={styles.covertextSmall}>{clientData.email}</Text>
                </>
              )}
            </View>
          </View>
        </View>
      </View>
      <Footer />
    </Page>
  )
}

export default CoverPage
