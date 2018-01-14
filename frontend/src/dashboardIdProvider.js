import { compose, getContext, mapProps, withContext } from 'recompose';
import PropTypes from 'prop-types';

const DASHBOARD_ID_CONTEXT_KEY = 'DASHBOARD_ID_CONTEXT_KEY';
export const dashboardIdContextPropTypes = {
  [DASHBOARD_ID_CONTEXT_KEY]: PropTypes.string,
};

const provideDashborarId = withContext(
  dashboardIdContextPropTypes,
  ({ dashboardId }) => ({
    [DASHBOARD_ID_CONTEXT_KEY]: dashboardId,
  })
);

// HERE: Provider component (adds `dashboardId` to context).
// Usage:
//
// <DashboardIdProvider dashboardId={someDashboardId}>
//   <Child1 />
//   <Child2>abc</Child2>
//   ...
//   All children here will be able to connect to `dashboardId` context.
//   This applies to:
//      - children
//      - children of children
//      - children of children of children
//      - children of children of children of children
//      - etc.
// </DashboardIdProvider>
export const DashboardIdProvider = provideDashborarId(
  ({ children }) => children
);

// HERE: Reads `dashboardId` from context and passes
// it as a props to wrapped component.
// Usage:
//
// class SomeComponent extends Component {
//   render () {
//     const { dashboardId } = this.props;
//     return (
//       <div>
//         dashboardId is: {dashboardId}
//       </div>
//     );
//   }
// }
//
// export default connectDashboardId(SomeComponent);
export const connectDashboardId = compose(
  getContext(dashboardIdContextPropTypes),
  mapProps(({ [DASHBOARD_ID_CONTEXT_KEY]: dashboardId, ...props }) => ({
    ...props,
    dashboardId,
  }))
);
