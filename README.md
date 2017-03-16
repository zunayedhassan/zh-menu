# zh-menu
A fully responsive menu which is compatible with Bootstrap

![Screenshot](https://raw.githubusercontent.com/zunayedhassan/zh-menu/master/screenshot.jpg "Screenshot")

## Usage:

```html

<!-- Style sheets -->
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />

<!-- zh-menu -->
<link rel="stylesheet" type="text/css" href="css/zh-menu.css" />
<link rel="stylesheet" type="text/css" href="css/zh-menu-themes.css" />

<!-- Scripts -->
<script type="text/javascript" src="js/jquery-3.1.1.min.js"></script>
<script type="text/javascript" src="js/bootstrap.min.js"></script>

<!-- zh-menu -->
<script type="text/javascript" src="js/zh-menu.js"></script>


<div class="row">
  <div class="col-md-12 zh-menu-parent">
      <nav id="my-menu">
          <!-- This list will be our menu -->
          <ul>
              <li>
                  <a href="#">Menu Item 1</a>
              </li>

              <li>
                  <a href="#">Menu Item 2</a>

                  <ul>
                      <li>
                          <a href="#">Submenu Item 1</a>
                      </li>

                      <li>
                          <a href="#">Submenu Item 2</a>
                      </li>

                      <li>
                          <a href="#">Submenu Item 3</a>
                      </li>

                      <li>
                          <a href="#">Submenu Item 4</a>
                      </li>
                  </ul>
              </li>
          </ul>
      </nav>

  </div>
</div>

<!-- Scripts -->
<script type="text/javascript" src="js/scripts.js"></script>
```
