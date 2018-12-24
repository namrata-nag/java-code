package Competitive;

import java.util.*;
import java.lang.Math;
public class SortedArrayMedian {
     public static void main(String[] str){
    	 int arr1[] = {1,2,5,9,11};
    	 int arr2[] = {1,4,7,9,11};
    	 int lenTotal = arr1.length +arr2.length;
    	 int count =0;
    	 int arr1Index = 0;
    	 int arr2Index = 0;
    	 int result = 0;
    	 while(count<Math.round(lenTotal/2)){
    		 if(count < arr1.length && count < arr2.length){
    			 if(arr1[arr1Index] > arr2[arr2Index]){
    				 result = arr1[arr1Index];
    				 count++;
    				 arr2Index++;
    			 }
    			 else{
    				 result = arr2[arr2Index];
    				 count++;
    				 arr1Index++;
    			 }
    		 }
    		 else if(count >= arr1.length){
    			 result = arr2[arr2Index];
    			 count++;
				 arr2Index++;
    		 }
    		 else if(count >= arr2.length){
    			 result = arr1[arr1Index];
    			 count++;
				 arr1Index++;
    		 }
    		 else{}
    		 
    	 }
    	 System.out.print(result);
    	 
    	 
     }
}
