import { useEffect, useState } from "react"
import { Image, Text, View } from "@react-pdf/renderer"
import { styles } from "./ReportStyles"
import convertToBase64 from "./PropertyImagetoBase64"

interface IProps {
  images: any[]
}

const PropertyImages = ({ images }: IProps) => {
  const [base64Strings, setBase64Strings] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      const imgURLs = images.map((item) => item.path)
      const promises = imgURLs.map(async (url) => {
        try {
          return await convertToBase64("https://api.allorigins.win/raw?url=" + url)
        } catch (error) {
          console.error("Failed to fetch image:", error)
          return null
        }
      })
      const results = await Promise.all(promises)
      const base64Strings = results.filter((result) => result !== null) as string[]
      setBase64Strings(base64Strings)
      setLoading(false)
    }
    fetchData()
  }, [images])
  if (loading) return <Text style={styles.paddingOneLeftRight}>loading...</Text>

  return (
    <View style={[styles.imageGrid, styles.paddingOneLeftRight]}>
      <View style={styles.imageGridRow}>
        {base64Strings[0] ? (
          <View style={styles.coverImageBox}>
            <Image src={base64Strings[0] as string} style={styles.imageItem} />
          </View>
        ) : (
          <Text style={styles.imageStackPlaceholder}>cover image placeholder</Text>
        )}
        <View style={styles.imageGridCol}>
          {base64Strings[1] ? (
            <View style={styles.imageStackItemBox}>
              <Image src={base64Strings[1] as string} style={styles.imageItem} />
            </View>
          ) : (
            <Text style={styles.imageStackPlaceholder}>img placeholder</Text>
          )}
          {base64Strings[2] ? (
            <View style={styles.imageStackItemBox}>
              <Image src={base64Strings[2] as string} style={styles.imageItem} />
            </View>
          ) : (
            <Text style={styles.imageStackPlaceholder}>Img placeholder</Text>
          )}
        </View>
      </View>
      <View style={styles.imageGridRow}>
        {base64Strings[3] ? (
          <View style={styles.imageItemBox}>
            <Image src={base64Strings[3] as string} style={styles.imageItem} />
          </View>
        ) : (
          <Text style={styles.imagePlaceholder}>Img placeholder</Text>
        )}
        {base64Strings[4] ? (
          <View style={styles.imageItemBox}>
            <Image src={base64Strings[4] as string} style={styles.imageItem} />
          </View>
        ) : (
          <Text style={styles.imagePlaceholder}>img placeholder</Text>
        )}
        {base64Strings[5] ? (
          <View style={styles.imageItemBox}>
            <Image src={base64Strings[5] as string} style={styles.imageItem} />
          </View>
        ) : (
          <Text style={styles.imagePlaceholder}>img placeholder</Text>
        )}
      </View>
    </View>
  )
}

export default PropertyImages
