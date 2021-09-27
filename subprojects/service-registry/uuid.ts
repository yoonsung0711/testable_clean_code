import { uid8digit } from '@micro/utils'

[...Array(5).keys()].forEach(_ => {
    console.log(uid8digit())
})