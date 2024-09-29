import { Page, Text, View } from "@react-pdf/renderer"
import { styles } from "./ReportStyles"
import Carpark from "./icons/Carpark"
import Bed from "./icons/Bed"
import Bath from "./icons/Bath"
import LandSize from "./icons/LandSize"
import BuildSize from "./icons/BuildSize"
import Layout from "./components/Layout"
import PropertyImages from "./PropertyImage"
import moment from "moment"
import PropertyLocation from "./PropertyLocation"
import { Property } from "../../../../../../Shared/Interface/property"
import { getAddressString } from "../../../../utils/helper"
interface IProps {
  propertyData: Property
}

const PropertyPage = ({ propertyData }: IProps) => {
  const { bedrooms, bathrooms, carSpaces, houseArea, landArea, address, createdDate, files, description, POIs } = propertyData
  return (
    <Page style={styles.contentPage}>
      <Layout>
        <View style={styles.paddingOneLeftRight}>
          <Text style={styles.textBig}>{getAddressString(address)}</Text>
          <View style={[styles.flexRow, styles.textSmall]}>
            <Text>On market since: </Text>
            <Text>{moment(createdDate).format("DD-MMM-YYYY")}</Text>
          </View>
        </View>
        <View style={[styles.paddingOneLeftRight, styles.flexRow, styles.gap2, styles.textSmall]}>
          <View style={[styles.flexRow, styles.gap1]}>
            <Bed />
            <Text>{bedrooms}</Text>
          </View>
          <View style={[styles.flexRow, styles.gap1]}>
            <Bath />
            <Text>{bathrooms}</Text>
          </View>
          <View style={[styles.flexRow, styles.gap1]}>
            <Carpark />
            <Text>{carSpaces}</Text>
          </View>
          <View style={[styles.flexRow, styles.gap1]}>
            <LandSize />
            <Text>{landArea}m²</Text>
          </View>
          <View style={[styles.flexRow, styles.gap1]}>
            <BuildSize />
            <Text>{houseArea}m²</Text>
          </View>
        </View>
        {files !== undefined && <PropertyImages images={files} />}
        <Text style={[styles.paddingOneLeftRight, styles.textSmall]}>Description: {description}</Text>
        <View style={[styles.paddingOneLeftRight, styles.gap1, styles.flexCol]}>
          <Text style={styles.textBig}>Nearby Facilities</Text>
          <View style={[styles.gap1, styles.flexRow]}>
            <View style={[styles.gap1, styles.flexCol]}>
              <Text style={styles.text}>Type</Text>
              {POIs?.map((poi, i) => (
                <Text key={i} style={styles.textSmall}>
                  {poi?.types ? poi?.types[0] : "N/A"}
                </Text>
              ))}
            </View>
            <View style={[styles.gap1, styles.flexCol]}>
              <Text style={styles.text}>Name</Text>
              {POIs?.map((poi, i) => (
                <Text key={i} style={styles.textSmall}>
                  {poi.name}
                </Text>
              ))}
            </View>
            <View style={[styles.gap1, styles.flexCol]}>
              <Text style={styles.text}>Rating</Text>
              {POIs?.map((poi, i) => (
                <Text key={i} style={styles.textSmall}>
                  {poi.rating || "N/A"}
                </Text>
              ))}
            </View>
            <View style={[styles.gap1, styles.flexCol]}>
              <Text style={styles.text}>Distance</Text>
              {POIs?.map((poi, i) => (
                <Text key={i} style={styles.textSmall}>
                  {poi.distance}
                </Text>
              ))}
            </View>
            <View style={[styles.gap1, styles.flexCol]}>
              <Text style={styles.text}>Drive</Text>
              {POIs?.map((poi, i) => (
                <Text key={i} style={styles.textSmall}>
                  {poi.duration}
                </Text>
              ))}
            </View>
          </View>
          {propertyData?.coordinates.lat !== 0 && propertyData?.coordinates.lng !== 0 && (
            <PropertyLocation center={propertyData.coordinates} address={propertyData.address} />
          )}
        </View>
      </Layout>
    </Page>
  )
}

export default PropertyPage
