import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Table = styled.table`
  width: 100%;
`
const Th = styled.th`
  padding: 15px 0;
`
const Td = styled.td`
  padding: 10px 0;
  border-bottom: 1px solid #f7f8fa;
  font-size: 14px;
  :first-child {
    border-top: 1px solid #f7f8fa;
  }
`
export default class TableComponent extends Component {
  static propTypes = {
    dataSource: PropTypes.array,
    columns: PropTypes.array
  }
  static defaultProps = {
    dataSource: [],
    columns: []
  }

  render () {
    return (
      <Table>
        <thead>
          <tr>
            {this.props.columns.map(data => (
              <Th key={data.key}>
                <div>{data.value}</div>
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.dataSource.map((data, index) => {
            return (
              <tr key={index}>
                {this.props.columns.map(col => {
                  return (
                    data[col.key] && (
                      <Td key={col.key}>
                        <div>{data[col.key]}</div>
                      </Td>
                    )
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
}
