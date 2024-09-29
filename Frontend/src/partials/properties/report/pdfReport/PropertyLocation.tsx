/* eslint-disable max-len */
import React from "react"
import { Image, Link, View } from "@react-pdf/renderer"
import { Address, Coordinates } from "../../../../shared/Interface/property"
import { styles } from "./ReportStyles"
import { getAddressString } from "../../../../utils/helper"
interface IProps {
  center: Coordinates
  address: Address
}

const PropertyLocation = ({ center, address }: IProps) => {
  const mapSize = "1000x1000"
  const zoom = 15
  return (
    <View style={[styles.gap1, styles.flexCol]}>
      <Link src={`https://www.google.com/maps?q=${getAddressString(address)}&hl=en`}>
        <Image
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${center.lat},${center.lng}&zoom=${zoom}&size=${mapSize}&key=${process.env.VITE_APP_GMAP_API_KEY}`}
          style={styles.propertylocation}
        />
      </Link>
    </View>
  )
}

export default PropertyLocation
