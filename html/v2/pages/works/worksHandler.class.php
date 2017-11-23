<?php

class worksHandler
{
    private $_works;
    private $_worksDir;
    private $_tilesArch;
    private $_tilesClass;    

    public function __construct($worksDir, $tilesArch, $tilesClass)
    {
        $this->findWorks($worksDir);

        var_dump($this->_work);
    }

    private function findWorks($dir)
    {
        foreach (array_slice(scandir($dir),2) as $cdir) {
            $this->_work[] = $cdir;
        }
    }
}