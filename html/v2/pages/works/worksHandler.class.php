<?php

class worksHandler
{
    private $_works;
    private $_worksDir;
    private $_tileContDepth;
    private $_tileArch;
    private $_tilesClass;    

    public function __construct($worksDir, $tilesArch, $tilesClass)
    {
        $this->_tileContDepth = 2;
        $this->findWorks($worksDir);
    }

    private function findWorks($dir)
    {
        foreach (array_slice(scandir($dir),2) as $cdir) {
            $this->_work[] = $cdir;
        }
    }

    private function generateTiles()
    {
        foreach ($this->_works as $i => $work) {
            $this->$_tileArch = $this->tileTemplate();
        }
    }

    private function tileTemplate($title, $figUrl, $figAlt)
    {
        ob_start(); ?>
            
        <?php
        $this->_tileArch = ob_get_contents();
        ob_end_clean();
    }

    public function setTilesClass(array $TilesClass)
    {

    }
}