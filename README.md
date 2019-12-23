# npm run build error
* https://github.com/creativetimofficial/argon-dashboard-react/issues/3
* to fix the error replace the file _icon.scss by: 
```

//
// Icon
//

.icon {
	width: $icon-size;
	height: $icon-size;

	i, svg {
		font-size: $icon-size - .75;
	}

    + .icon-text {
    	padding-left: 1rem;
    	    
    }
}


// Extra large icons

.icon-xl {
	width: $icon-size-xl;
	height: $icon-size-xl;

	i, svg {
		font-size: $icon-size-xl - .75;
	}

    + .icon-text {
    	   
    }
}


// Large icons

.icon-lg {
	width: $icon-size-lg;
	height: $icon-size-lg;

	i, svg {
		font-size: $icon-size-lg - .75;
	}

    + .icon-text {
    	 
    }
}


// Small icon

.icon-sm {
	width: $icon-size-sm;
	height: $icon-size-sm;

	i, svg {
		font-size: $icon-size-sm - .75;
	}

    + .icon-text {
    	
    }
}


```