import { View, Image, Text } from "@react-pdf/renderer"
import { styles } from "../ReportStyles"
import { IFile } from "../../../../api/resTypes"

interface IProps {
  images: IFile[]
}

const ImageGrid = ({ images }: IProps) => {
  const coverImage = images.find((image) => image.isCoverPage === true)
  const otherImages = images.filter((image) => image.isCoverPage === false).slice(1, 6)

  return (
    <View style={styles.imageGrid}>
      <View style={styles.imageGridRow}>
        <View style={styles.coverImageBox}>
          <Image
            src={{ uri: coverImage ? coverImage.url : images[0].url, method: "GET", headers: { "Cache-Control": "no-cache" }, body: "" }}
            style={styles.imageItem}
          />
        </View>
        <View style={styles.imageGridCol}>
          {otherImages[0] ? (
            <View style={styles.imageStackItemBox}>
              <Image src={{ uri: otherImages[0].url, method: "GET", headers: { "Cache-Control": "no-cache" }, body: "" }} style={styles.imageItem} />
            </View>
          ) : (
            <Text style={styles.imageStackPlaceholder}>img placeholder</Text>
          )}
          {otherImages[1] ? (
            <View style={styles.imageStackItemBox}>
              <Image src={{ uri: otherImages[1].url, method: "GET", headers: { "Cache-Control": "no-cache" }, body: "" }} style={styles.imageItem} />
            </View>
          ) : (
            <Text style={styles.imageStackPlaceholder}>Img placeholder</Text>
          )}
        </View>
      </View>
      <View style={styles.imageGridRow}>
        {otherImages[2] ? (
          <View style={styles.imageItemBox}>
            <Image src={{ uri: otherImages[2].url, method: "GET", headers: { "Cache-Control": "no-cache" }, body: "" }} style={styles.imageItem} />
          </View>
        ) : (
          <Text style={styles.imagePlaceholder}>Img placeholder</Text>
        )}
        {otherImages[3] ? (
          <View style={styles.imageItemBox}>
            <Image src={{ uri: otherImages[3].url, method: "GET", headers: { "Cache-Control": "no-cache" }, body: "" }} style={styles.imageItem} />
          </View>
        ) : (
          <Text style={styles.imagePlaceholder}>img placeholder</Text>
        )}
        {otherImages[4] ? (
          <View style={styles.imageItemBox}>
            <Image src={{ uri: otherImages[4].url, method: "GET", headers: { "Cache-Control": "no-cache" }, body: "" }} style={styles.imageItem} />
          </View>
        ) : (
          <Text style={styles.imagePlaceholder}>img placeholder</Text>
        )}
      </View>
    </View>
  )
}

export default ImageGrid
