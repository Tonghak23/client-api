import React from 'react'
import { Space, Spin } from 'antd';

const LoadingComponent = () => {
  return (
    <>
          <Space
              direction="vertical"
              style={{
                  width: '100%',
              }}
          >
              <Spin tip="">
                  <div className="container-fluid">
                      <div className="row">
                          <div className="col-xl-12">
                
                          </div>
                      </div>
                  </div>
              </Spin>
          </Space>
    </>
  )
}

export default LoadingComponent