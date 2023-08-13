import * as renderer from 'react-test-renderer'
import Loading from './Loading'

describe('Loading component', () => {
  it('Show spinner when loading even if error is specified', () => {
    const component = renderer.create(
      <Loading
        loading
        error="error"
      >
        {() => <h1>test</h1>}
      </Loading>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Show small spinner when loading but already containing data', () => {
    const component = renderer.create(
      <Loading
        loading
        data="content"
      >
        {(data) => <h1>{data}</h1>}
      </Loading>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
