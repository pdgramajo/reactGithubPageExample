import React from 'react'
import ReactLoading from 'react-loading';

const Loading = () => (
    <div tabIndex='-1' style={{ position: 'relative', zIndex: 1050, display: 'block' }}>
        <div>
            <div className='modal fade show' role='dialog' tabIndex='-1' style={{ display: 'block' }}>
                <div className='modal-dialog' style={{ top: '38%', left: '13%' }} role='document'>
                    <div>
                        <ReactLoading type={'spin'} color='black' height={267} width={75} />
                    </div>
                </div>
            </div>
            <div className='modal-backdrop fade show'></div>
        </div>
    </div>
);

export default Loading