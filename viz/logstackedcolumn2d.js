import LogMSColumn2d from'./logmscolumn2d';import StackManager from'../_internal/datasets/groups/cartesian.stack';class LogStackedColumn2d extends LogMSColumn2d{static getName(){return'LogStackedColumn2d'}getName(){return'LogStackedColumn2d'}__setDefaultConfig(){super.__setDefaultConfig();let a=this.config;a.friendlyName='Stacked Log Column Chart',a.isstacked=!0}getDSGroupdef(){return StackManager}}export default LogStackedColumn2d;