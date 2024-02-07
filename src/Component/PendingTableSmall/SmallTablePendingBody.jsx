import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const SmallTablePendingBody = () => {
  return (
    <>
      {
        Array.from({ length: 4 }).map((_, index) => (
          <tr key={index}>
            <td>
              <Skeleton width={50} height={10} style={{ margin:'auto'}}/>
            </td>
            <td>
              <Skeleton width={150} height={10} style={{ margin:'auto'}}/>
            </td>
            <td>
              <Skeleton width={100} height={10} style={{ margin:'auto'}}/>
            </td>
          </tr>
        ))
      }
    </>
  )
}

export default SmallTablePendingBody