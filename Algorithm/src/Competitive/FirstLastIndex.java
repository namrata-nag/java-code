package Competitive;

public class FirstLastIndex {
	    void firstIndex(int[] arr,int low,int high,int x){
	    	int mid = low + (high-low)/2;
	    	if(mid == low){
	    		mid=mid+1;
	    		System.out.print("First Index : "+ mid);
	    		return;
	    	}
	    	if(arr[mid] < x){
	    		firstIndex(arr,mid,high,x);
	    	}
	    	else{
	    		firstIndex(arr,low,mid,x);
	    	}
	    }
		public static void main(String []str){
			int[] arr ={2,2,7,13,13,13,14,14,19,19,19,19};
			FirstLastIndex obj = new FirstLastIndex();
			int x = 2;
			obj.firstIndex(arr,0,arr.length,x);
		}
}
