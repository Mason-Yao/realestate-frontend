import { getProfile } from "../apis/profile"
import { Profile } from "../../../Shared/Interface/profile"

// TODO: move PK to shared
const USER_PK = "User"

export const validateUser = async (email: string): Promise<Profile | undefined> => {
  const profile: Profile = await getProfile(email).then((res) => {
    return res
  })
  if (profile.PK === USER_PK) {
    return profile
  }
  return undefined
}
