import { View, Text } from "@react-pdf/renderer"
import { styles } from "../ReportStyles"
import moment from "moment"
import { IHistory } from "../../../../api/resTypes"

interface IProps {
  history: IHistory[] | undefined
}

const PropertyHistory = ({ history }: IProps) => {
  return (
    <View style={[styles.flexCol, styles.gap1]}>
      <Text style={styles.h2}>Property History:</Text>
      {history?.map((item, index) => (
        <View key={index} style={styles.flexRow}>
          <Text style={[styles.text, styles.minWidth]}>{moment(item.date).format("DD MMM YYYY")}</Text>
          <Text style={styles.textSmall}>- {item.event}</Text>
        </View>
      ))}
    </View>
  )
}

export default PropertyHistory
