package sorting;

public class Bubble {
	
	void sortingFn(int[] arr){
		for(int x=1;x<arr.length;x++){
			 int m =x;
			for(int j = x-1; j>=0 ;--j){
				if(arr[j]>arr[m]){
					int temp = arr[j];
					arr[j]= arr[m];
					arr[m] = temp;
					m= m-1;
				}
				else{break;}
			}
		}
		
		for(int x=0;x<arr.length;x++){
			System.out.println(arr[x]);
		}
	}
	
	
	public static void main(String str[]){
		int[] arr = {20,35,-15,11,39,22,50};
		Bubble obj = new Bubble();
		obj.sortingFn(arr);
		
	}
}
