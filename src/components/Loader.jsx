import loader from '../assets/spinner.gif'

// eslint-disable-next-line react/prop-types
export default function Loader({ loading }) {
    return (
        <>
            {
                loading &&
                <div className=''>
                    <img src={loader} alt="loader" className='m-auto' />
                </div>
            }
        </>
    )
}
