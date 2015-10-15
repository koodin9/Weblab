<!DOCTYPE html>
<html>
<head>
    <title>Course list</title>
    <meta charset="utf-8" />
    <link href="courses.css" type="text/css" rel="stylesheet" />
</head>
<body>
<div id="header">
    <h1>Courses at CSE</h1>
<!-- Ex. 1: File of Courses -->
    <p>
        <?php
            $courseList = file("courses.tsv");
        ?>
        Course list has <?= (int) sizeof($courseList); ?> total courses
        and
        size of <?= filesize("courses.tsv"); ?> bytes.
    </p>
</div>
<div class="article">
    <div class="section">
        <h2>Today's Courses</h2>
<!-- Ex. 2: Today’s Courses & Ex 6: Query Parameters -->
        <?php
            function getCoursesByNumber($courseList, $numberOfCourses){
                $resultArray = array();
//                implement here.
                for($i = 0; $i < $numberOfCourses; $i++){
                    array_push($resultArray, $courseList[rand(0, $numberOfCourses)]);
                }
                return $resultArray;
            }
        ?>
        <ol>
            <?php
                $number_of_courses = 3;
                if(isset($_GET["number_of_courses"])){//URL에 news_pages라는 변수가 있냐?
                    $number_of_courses = (int) $_GET["number_of_courses"];//int로 형변환 해서 가져와
                }
                $todaysCourses = getCoursesByNumber($courseList, $number_of_courses);
                foreach ($todaysCourses as $courses) { ?>
                <?php 
                    $piece = explode("\t", $courses); ?>
                    <li><?= "$piece[0] - $piece[1]" ?></li>
                <?php } ?>
        </ol>
    </div>
    <div class="section">
        <h2>Searching Courses</h2>
<!-- Ex. 3: Searching Courses & Ex 6: Query Parameters -->
        <?php
            function getCoursesByCharacter($courseList, $startCharacter){
                $resultArray = array();
//                implement here.
                for($i = 0; $i < (int)sizeof($courseList); $i++){
                    if(strcmp($courseList[$i][0], $startCharacter[0]) == 0){
                        array_push($resultArray, $courseList[$i]);
                    }
                }
                return $resultArray;
            }
        ?>
        <?php
            $character = "C";
            if(isset($_GET["character"])){//URL에 news_pages라는 변수가 있냐?
                $character = $_GET["character"];//int로 형변환 해서 가져와
            }
        ?>
        <p>
            Courses that started by <strong>'<?= $character?>'</strong> are followings :
        </p>
        <ol>
            <?php
                $courseList = file("courses.tsv");
                $searchedCourses = getCoursesByCharacter($courseList, $character);
                foreach ($searchedCourses as $courses) { ?>
                <?php 
                    $piece = explode("\t", $courses); ?>
                    <li><?= "$piece[0] - $piece[1]" ?></li>
                <?php } ?>
        </ol>
    </div>
    <div class="section">
        <h2>List of Courses</h2>
<!-- Ex. 4: List of Courses & Ex 6: Query Parameters -->
        <?php
            function getCoursesByOrder($courseList, $orderby){
                $resultArray = $courseList;
//                implement here.
                if($orderby == "1"){
                    sort($resultArray);
                } else {
                    rsort($resultArray);
                }
                return $resultArray;
            }
        ?>
        <p>
            All of courses ordered by <strong>alphabetical order</strong> are followings :
        </p>
        <ol>
            <?php
                $orderby = "0";
                if(isset($_GET["orderby"])){//URL에 news_pages라는 변수가 있냐?
                    $orderby = $_GET["orderby"];//int로 형변환 해서 가져와
                }
                $orderedCourses = getCoursesByOrder($courseList, $orderby);
                foreach ($orderedCourses as $courses) { 
                    $piece = explode("\t", $courses);
                    if((int) strlen($piece[0]) > "20"){ ?>
                        <li class = "long"><?= "$piece[0] - $piece[1]" ?></li>
                    <?php } else { ?>
                        <li><?= "$piece[0] - $piece[1]" ?></li>
                    <?php }
                }     
            ?>
        </ol>
    </div>
    <div class="section">
        <h2>Adding Courses</h2>
<!-- Ex. 5: Adding Courses & Ex 6: Query Parameters -->
        <?php
            if(isset($_GET["newCourse"]) && isset($_GET["codeOfCourse"])){
                $newCourse = $_GET["newCourse"];
                $codeOfCourse = $_GET["codeOfCourse"];
                $new_text = "\n$newCourse\t$codeOfCourse";
                file_put_contents("courses.tsv", $new_text, FILE_APPEND); ?>
                <p>Adding a course is success!</p>
            <?php } else { ?>
            <p>Input course or code of the course doesn't exist.</p>
        <?php } ?>
        
    </div>
</div>
<div id="footer">
    <a href="http://validator.w3.org/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-html.png" alt="Valid HTML5" />
    </a>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-css.png" alt="Valid CSS" />
    </a>
</div>
</body>
</html>