import SSBarCartesian from'./ssbarcartesian';import Bar2DDataset from'../_internal/datasets/bar2d';class Bar2D extends SSBarCartesian{constructor(){super(),this.isBar=!0}static getName(){return'Bar2D'}getType(){return'chartAPI'}getName(){return'Bar2D'}__setDefaultConfig(){super.__setDefaultConfig(),this.config.friendlyName='Bar Chart',this.config.singleseries=!0,this.config.defaultDatasetType='bar2d',this.config.enablemousetracking=!0}getDSdef(){return Bar2DDataset}getDSGroupdef(){}}export default Bar2D;