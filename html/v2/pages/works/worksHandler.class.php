<?php

class worksHandler
{
    private $_works;
    private $_worksDir;
    private $_tileContDepth;
    private $_tileArch;
    private $_figureClass;
    private $_captionClass;
    private $_jsonWorks;
    
    /**
     *  tilesClass struct:
     *      lenght = $_tileContDepth
     *      [0] => flex-container flex-justify-center flex-wrap main-work
     *      [1] => flex-container flex-columns project-tile fourth-width
    */
    private $_tilesClass;    

    public function __construct(string $worksDir)
    {
        $this->_tileContDepth = 2;
        $this->_worksDir = $worksDir;
        $this->findWorks($worksDir);
        var_dump($this->_works);
        $this->_tilesClass = [
            "flex-container flex-justify-center flex-wrap main-work", 
            "flex-container flex-columns project-tile fourth-width"
        ];
        $this->_figureClass = "project-figure";
        $this->_captionClass = "project-caption";
        
        $this->tileTemplate("bonjour", "../images/avatar.jpg", "Avatar dodécaèdre");
    }

    private function findWorks($dir)
    {
        foreach (array_slice(scandir($dir),2) as $cdir) {
            $this->_works[] = $cdir;
        }
    }

    private function generateTiles()
    {
        foreach ($this->_works as $i => $work) {
            $this->$_tileArch = $this->tileTemplate();
        }
    }

    private function populateJson()
    {

    }

    private function tileTemplate($title, $figUrl, $figAlt)
    {
        ob_start(); ?>
            
                <?php
                    for ($i = 0; $i < $this->_tileContDepth; $i++)
                    {
                        echo "<div class='{$this->_tilesClass[$i]}'>";
                    }
                ?>
                <div class=<?= "'$this->_figureClass'"; ?>>
                    <img src="<?= $figUrl; ?>" alt="<?= $figAlt; ?>">
                </div>
                <span class=<?= "'$this->_captionClass'"; ?>>
                    <?= $title; ?>
                </span>
                <?php
                    for ($i = 0; $i < $this->_tileContDepth; $i++)
                    {
                        echo "</div>";
                    }
                ?>                
            </div>
        <?php
        $this->_tileArch = ob_get_contents();
        ob_end_clean();

        echo $this->_tileArch;
    }
}